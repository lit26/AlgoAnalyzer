from tkinter import TRUE
import backtrader as bt


class MACDStrategy(bt.Strategy):
    params = (
        ("fast_length", 12), 
        ("slow_length", 26), 
        ("period_signal", 9), 
    )

    def __init__(self):
        macd = bt.ind.MACD(
            period_me1=self.params.fast_length,
            period_me2=self.params.slow_length,
            period_signal=self.params.period_signal,
        )
        self.crossover = bt.ind.CrossOver(macd.macd, macd.signal)

    def next(self):
        if not self.position:
            if self.crossover > 0:
                self.buy()
        elif self.crossover < 0:
            self.close()
