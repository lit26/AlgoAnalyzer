import backtrader as bt
import backtrader.analyzers as btanalyzers
import pandas as pd
from .strategy.MaCrossStrategy import MaCrossStrategy

DEFAULT_CASH = 1000000
DEFAULT_SIZER = 95

STRATEGIES = {"MaCrossStrategy": MaCrossStrategy}

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
            {k: v} for k, v in strategy.params.__dict__.items() if not k.startswith("_")
        ]
        return params

    def update_settings(self, cash, percent_sizer):
        self._default_cash = cash
        self._percent_sizer = percent_sizer