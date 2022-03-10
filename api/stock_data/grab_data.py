import os
import pandas as pd
import yfinance as yf

BASE_PATH = "api/stock_data/data/"
PERIOD = "5y"


def get_data(ticker, timeframe):
    data = yf.download(ticker, interval=timeframe, period=PERIOD)
    starttime = data.index[0].strftime("%Y-%m-%d")
    endtime = data.index[-1].strftime("%Y-%m-%d")
    data.dropna(inplace=True)
    data.to_csv(f"{BASE_PATH}{ticker}_{timeframe}.csv")
    return starttime, endtime


def check_exists(ticker, timeframe):
    if not os.path.exists(f"{BASE_PATH}{ticker}_{timeframe}.csv"):
        return get_data(ticker, timeframe)
    return None


def read_data(ticker, timeframe):
    df = pd.read_csv(f"{BASE_PATH}{ticker}_{timeframe}.csv")
    df = df.dropna().reset_index(drop=True)
    return df


def delete_data(ticker, timeframe):
    try:
        os.remove(f"{BASE_PATH}{ticker}_{timeframe}.csv")
    except:
        pass
