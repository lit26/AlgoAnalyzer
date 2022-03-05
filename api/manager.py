import backtrader as bt
import backtrader.analyzers as btanalyzers
from .strategy.MaCrossStrategy import MaCrossStrategy
from .strategy.MACDStrategy import MACDStrategy
from .analysis.trades import Trades
from .analysis.result import *

DEFAULT_CASH = 1000000
DEFAULT_FIX_SIZER = 10
DEFAULT_PERCENT_SIZER = 95

STRATEGIES = {
    "MA Cross Strategy": MaCrossStrategy,
    "MACD Strategy": MACDStrategy,
}

BASE_STOCK_DATA = "api/stock_data/data"


class StrategiesManager:
    def __init__(self):
        self._strategies = STRATEGIES

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

    def _add_analyzer(self, cerebro):
        cerebro.addanalyzer(btanalyzers.SharpeRatio, _name="sharpe")
        cerebro.addanalyzer(btanalyzers.DrawDown, _name="drawdown")
        cerebro.addanalyzer(btanalyzers.Returns, _name="returns")
        cerebro.addanalyzer(btanalyzers.SQN, _name="sqn")
        cerebro.addanalyzer(btanalyzers.PositionsValue, _name="positions", cash=True)
        # cerebro.addanalyzer(btanalyzers.TradeAnalyzer, _name="trade")
        # cerebro.addanalyzer(btanalyzers.Transactions, _name="transactions")
        cerebro.addanalyzer(Trades, _name="trades")

        return cerebro

    def run_strategy(
        self,
        strategy_name,
        ticker,
        timeframe,
        params,
        sizer,
        cash=DEFAULT_CASH,
        percentage_sizer=DEFAULT_PERCENT_SIZER,
        fix_sizer=DEFAULT_FIX_SIZER,
    ):
        cerebro = bt.Cerebro()

        # add strategy
        cerebro.addstrategy(self._strategies[strategy_name], **params)

        # load data
        data_file = f"{BASE_STOCK_DATA}/{ticker}_{timeframe}.csv"
        data = bt.feeds.YahooFinanceCSVData(dataname=data_file, adjclose=False)
        cerebro.adddata(data)

        # settings
        cerebro.broker.setcash(cash)
        if sizer == "fix":
            cerebro.addsizer(bt.sizers.FixedSize, stake=fix_sizer)
        elif sizer == "percentage":
            cerebro.addsizer(bt.sizers.PercentSizerInt, percents=percentage_sizer)

        # analyzers
        cerebro = self._add_analyzer(cerebro)

        # run backtrader
        strat = cerebro.run()
        back = strat[0]

        return analysis(back.analyzers, ticker, timeframe)
