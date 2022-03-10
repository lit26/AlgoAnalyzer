import json
import numpy as np
import pandas as pd
from ..stock_data.grab_data import *
from ..plot.plot import Stockplot, Portfolioplot


def analysis(analyzers, ticker, timeframe, plotkind):
    df = read_data(ticker, timeframe)
    df["Date"] = pd.to_datetime(df["Date"])

    trades_res = analyzers.trades.get_analysis()
    positions_res = analyzers.positions.get_analysis()
    trades = get_trades(trades_res["trades"], trades_res["transactions"])

    stat = {}
    pnl_list, pnl_stat = get_pnl_info(trades)
    for k,v in pnl_stat.items():
        stat[k] = v
    pnl_list = np.array([i/100 for i in pnl_list])
    returns = (1 + pnl_list).cumprod() - 1
    if len(returns) == 0:
        stat['totalreturn'] = 0
    else:
        stat['totalreturn'] = returns[-1]*100
    
    plot, position_plot = get_strategy_plot(
        df, trades_res["transactions"], positions_res, plotkind
    )
    stat['buyhold'] = (df['Adj Close'].iloc[-1]-df['Adj Close'].iloc[0])*100/df['Adj Close'].iloc[0]

    res = analyzers.drawdown.get_analysis()
    drawdown_info = get_drawdown(res)

    stat["sharpe"] = analyzers.sharpe.get_analysis()["sharperatio"]
    res = analyzers.sqn.get_analysis()
    for k, v in res.items():
        stat[k] = v

    res = analyzers.returns.get_analysis()
    for k, v in res.items():
        stat[k] = v

    return {
        "stat": stat,
        "trades": trades,
        "plot": plot,
        "drawdown": drawdown_info,
        "portfolio": position_plot,
    }


def get_drawdown(drawdown):
    return {
        "drawdown": drawdown.drawdown,
        "moneydown": drawdown.moneydown,
        "maxdrawdown": drawdown.max.drawdown,
        "maxmoneydown": drawdown.max.moneydown,
    }

def get_pnl_info(trades):
    pnl_list = [trade['trades'][1]['pnlpct'] for trade in trades if len(trade['trades']) == 2]
    if len(pnl_list) == 0:
        return [], {
            'maxpnl': 0,
            'minpnl': 0,
            'winrate': 0
        }
    return pnl_list, {
        'maxpnl': max(pnl_list),
        'minpnl': min(pnl_list),
        'winrate': len([i for i in pnl_list if i > 0])*100 / len(pnl_list)
    }


def get_strategy_plot(df, transactions, positions, plotkind):

    # transactions plot
    df = get_buy_sell(df, transactions)
    addplot = [
        dict(column="BUY", kind="scatter", color="green", size=15, marker="triangle"),
        dict(
            column="SELL",
            kind="scatter",
            color="red",
            size=15,
            marker="inverted_triangle",
        ),
    ]
    bfp = Stockplot(df, addplot=addplot, kind=plotkind)
    json_item, p_scale = bfp.get_component()
    plot = {"pscale": p_scale, "plotdata": json.dumps(json_item)}

    # portfolio plot
    df["Portfolio"] = [sum(v) for _, v in positions.items()]
    df["Positions"] = [v[0] for _, v in positions.items()]
    bfp_portfolio = Portfolioplot(df)
    position_json_item, p_scale2 = bfp_portfolio.get_component()
    position_plot = {"pscale": p_scale2, "plotdata": json.dumps(position_json_item)}
    return plot, position_plot

def get_trades(trades, transactions):
    all_trades = []
    for k, v in trades.items():
        transactions_in_trade = []
        for trade in v:
            trade_date = trade["date"]
            transaction = transactions[trade_date]
            transaction_info = {
                "date": trade["date"],
                "action": transaction[0][0],
                "size": transaction[0][1],
                "price": transaction[0][2],
                "pnl": trade["pnl"],
                "pnlcomm": trade["pnlcomm"],
                "barlen": trade["barlen"],
            }
            transactions_in_trade.append(transaction_info)
        all_trades.append({"ref": k, "trades": transactions_in_trade})
    return [calculate_pnl_pct(i) for i in all_trades]

def calculate_pnl_pct(trade):
    if len(trade['trades']) == 2:
        trades = trade['trades']
        from_trade = trades[0]
        to_trade = trades[1]
        from_trade['pnlpct'] = 0
        to_trade['pnlpct'] = (to_trade['price'] - from_trade['price'])*100/from_trade['price']
        
        trade['trades'] = [from_trade, to_trade]
    return trade


def get_buy_sell(df, transactions):
    buy_list = []
    sell_list = []
    for _, v in transactions.items():
        if len(v) == 0:
            buy_list.append(None)
            sell_list.append(None)
        elif v[0][0] == "BUY":
            buy_list.append(v[0][2])
            sell_list.append(None)
        else:
            buy_list.append(None)
            sell_list.append(v[0][2])
    df["BUY"] = buy_list
    df["SELL"] = sell_list
    return df
