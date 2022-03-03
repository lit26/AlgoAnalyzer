def analysis(analyzers):
    res = analyzers.trades.get_analysis()
    trades = get_trades(res['trades'], res['transactions'])

    return {
        'trades': trades
    }

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