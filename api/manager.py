import backtrader as bt
import backtrader.analyzers as btanalyzers
import pandas as pd
from .strategy.MaCrossStrategy import MaCrossStrategy
from .strategy.MACDStrategy import MACDStrategy
from .analysis.trades import Trades
from .analysis.result import *

DEFAULT_CASH = 1000000
DEFAULT_SIZER = 95

STRATEGIES = {
    "MA Cross Strategy": MaCrossStrategy,
    "MACD Strategy": MACDStrategy,
}

BASE_STOCK_DATA = "api/stock_data/data"


class StrategiesManager:
    def __init__(self):
        self._strategies = STRATEGIES
        self._default_cash = DEFAULT_CASH
        self._default_sizer = DEFAULT_SIZER

    def get_strategy_detail(self, strategy_name):
        if strategy_name not in self._strategies:
            return None
        strategy = self._strategies[strategy_name]
        params = [
            {"name": k, "default": v}
            for k, v in strategy.params.__dict__.items()
            if not k.startswith("_")
        ]
        return params

    def update_settings(self, cash, percent_sizer):
        self._default_cash = cash
        self._percent_sizer = percent_sizer

    def _add_analyzer(self, cerebro):
        # cerebro.addanalyzer(btanalyzers.SharpeRatio, _name="sharpe")
        # cerebro.addanalyzer(btanalyzers.DrawDown, _name="drawdown")
        # cerebro.addanalyzer(btanalyzers.Returns, _name="returns")
        # cerebro.addanalyzer(btanalyzers.Position, _name="position")
        # cerebro.addanalyzer(btanalyzers.TradeAnalyzer, _name="trade")
        # cerebro.addanalyzer(btanalyzers.Transactions, _name="transactions")
        cerebro.addanalyzer(Trades, _name="trades")

        return cerebro

    def run_strategy(self, strategy_name, ticker, timeframe, params):
        cerebro = bt.Cerebro()

        # add strategy
        cerebro.addstrategy(self._strategies[strategy_name], **params)

        # load data
        data = bt.feeds.YahooFinanceCSVData(
            dataname=f"{BASE_STOCK_DATA}/{ticker}_{timeframe}.csv"
        )
        cerebro.adddata(data)

        # settings
        cerebro.broker.setcash(self._default_cash)
        cerebro.addsizer(bt.sizers.PercentSizer, percents=self._default_sizer)

        # analyzers
        cerebro = self._add_analyzer(cerebro)

        # run backtrader
        strat = cerebro.run()
        back = strat[0]

        return analysis(back.analyzers)

        # return analysis(back.analyzers)
