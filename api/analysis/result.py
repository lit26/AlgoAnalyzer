import json
import pandas as pd
from ..stock_data.grab_data import *
from ..plot.plot import plot

def analysis(analyzers, ticker, timeframe):
    res = analyzers.trades.get_analysis()
    trades = get_trades(res['trades'], res['transactions'])
    json_item = get_strategy_plot(ticker, timeframe, res['transactions'])

    res = analyzers.drawdown.get_analysis()
    drawdown_info = get_drawdown(res)

    stat = {}
    stat['sharpe'] = analyzers.sharpe.get_analysis()['sharperatio']
    res = analyzers.sqn.get_analysis()
    for k, v in res.items():
        stat[k] = v

    res = analyzers.returns.get_analysis()
    for k,v in res.items():
        stat[k] = v

    return {
        'stat': stat,
        'trades': trades,
        'plot': json.dumps(json_item),
        'drawdown': drawdown_info
    }

def get_drawdown(drawdown):
    return {
        'drawdown': drawdown.drawdown,
        'moneydown': drawdown.moneydown,
        'maxdrawdown': drawdown.max.drawdown,
        'maxmoneydown': drawdown.max.moneydown
    }

def get_strategy_plot(ticker, timeframe, transactions):
    df = read_data(ticker, timeframe)
    df["Date"] = pd.to_datetime(df["Date"])
    df = get_buy_sell(df, transactions)
    addplot = [
        dict(
            column="BUY",
            kind='scatter',
            color='green',
            size=15,
            marker="triangle"
        ),  dict(
            column="SELL",
            kind='scatter',
            color='red',
            size=15,
            marker="inverted_triangle"
        )]
    bfp = plot(ticker, df, addplot=addplot)
    json_item = bfp.get_component()
    return json_item

def get_trades(trades, transactions):
    all_trades = []
    for k, v in trades.items():
        transactions_in_trade = []
        for trade in v:
            trade_date = trade['date']
            transaction = transactions[trade_date]
            transaction_info = {
                'date': trade['date'],
                'action': transaction[0][0],
                'size': transaction[0][1],
                'price': transaction[0][2],
                'pnl': trade['pnl'],
                'pnlcomm': trade['pnlcomm'],
                'barlen': trade['barlen'],
            }
            transactions_in_trade.append(transaction_info)
        all_trades.append({
            'ref': k,
            'trades': transactions_in_trade
        })
    return all_trades

def get_buy_sell(df, transactions):
    buy_list = []
    sell_list = []
    for _, v in transactions.items():
        if len(v) == 0:
            buy_list.append(None)
            sell_list.append(None)
        elif v[0][0] == 'BUY':
            buy_list.append(v[0][2])
            sell_list.append(None)
        else:
            buy_list.append(None)
            sell_list.append(v[0][2])
    df['BUY'] = buy_list
    df['SELL'] = sell_list
    return df