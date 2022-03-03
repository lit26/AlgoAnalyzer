from __future__ import (absolute_import, division, print_function,
                        unicode_literals)


import collections

import backtrader as bt
from backtrader.utils import AutoOrderedDict
from backtrader import Order, Position


class Trades(bt.Analyzer):
    '''This analyzer reports the transactions occurred with each an every data in
    the system

    Params:

      - headers (default: ``True``)

        Add an initial key to the dictionary holding the results with the names
        of the datas

        This analyzer was modeled to facilitate the integration with
        ``pyfolio`` and the header names are taken from the samples used for
        it::

          'date', 'type', 'amount', 'price',

    Methods:

      - get_analysis

        Returns a dictionary with returns as values and the datetime points for
        each return as keys
    '''
    params = (
        ('headers', False),
        ('_pfheaders', ('date', 'type', 'amount', 'price')),
    )

    def start(self):
        super(Trades, self).start()

        self._positions = collections.defaultdict(Position)
        self._idnames = list(enumerate(self.strategy.getdatanames()))
        self.rets = AutoOrderedDict()
        self.rets.trades = {}
        if self.p.headers:
            self.rets.transactions[self.p._pfheaders[0]] = [list(self.p._pfheaders[1:])]
        
        

    def notify_order(self, order):
        # An order could have several partial executions per cycle (unlikely
        # but possible) and therefore: collect each new execution notification
        # and let the work for next

        # We use a fresh Position object for each round to get summary of what
        # the execution bits have done in that round
        if order.status not in [Order.Partial, Order.Completed]:
            return  # It's not an execution

        pos = self._positions[order.data._name]
        for exbit in order.executed.iterpending():
            if exbit is None:
                break  # end of pending reached

            pos.update(exbit.size, exbit.price)
    
    def _record_trade(self, ref, trade_info):
        if ref not in self.rets.trades:
            self.rets.trades[ref] = []
        self.rets.trades[ref].append(trade_info)
            
    def notify_trade(self, trade):
        if trade.justopened:
            trade_info = {
                'date': self.strategy.datetime.datetime(),
                'size': trade.size,
                'price': trade.price,
                'pnl': trade.pnl,
                'pnlcomm': trade.pnlcomm,
                'baropen':trade.baropen,
                'dtopen': trade.dtopen,
                'barlen': trade.barlen,
            }
            self._record_trade(trade.ref, trade_info)

        elif trade.status == trade.Closed:
            trade_info = {
                'date': self.strategy.datetime.datetime(),
                'size': trade.size,
                'price': trade.price,
                'pnl': trade.pnl,
                'pnlcomm': trade.pnlcomm,
                'baropen':trade.baropen,
                'dtopen': trade.dtopen,
                'barlen': trade.barlen,
            }
            self._record_trade(trade.ref, trade_info)

    def next(self):
        # super(Transactions, self).next()  # let dtkey update
        entries = []
        for i, dname in self._idnames:
            pos = self._positions.get(dname, None)
            if pos is not None:
                size, price = pos.size, pos.price
                if size:
                    entries.append(['BUY' if size>=0 else "SELL", size, price])

        if entries:
            self.rets.transactions[self.strategy.datetime.datetime()] = entries
        else:
            self.rets.transactions[self.strategy.datetime.datetime()] = []

        self._positions.clear()