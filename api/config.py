from .strategy.MaCrossStrategy import MaCrossStrategy
from .strategy.MACDStrategy import MACDStrategy

DEFAULT_CASH = 1000000
DEFAULT_SIZER = "percentage"
DEFAULT_SIZER_AMOUNT = 95

UP_COLOR = 'green'
DOWN_COLOR = 'red'

STRATEGIES = {
    "MA Cross Strategy": MaCrossStrategy,
    "MACD Strategy": MACDStrategy,
}
