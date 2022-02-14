import os
import pandas as pd
import yfinance as yf

base_path = 'api/stock_data/data/'

def get_data(ticker, timeframe):
    data = yf.download(ticker, interval=timeframe)
    starttime = data.index[0].strftime("%Y-%m-%d")
    endtime = data.index[-1].strftime("%Y-%m-%d")
    data.to_csv(f'{base_path}{ticker}_{timeframe}.csv')
    return starttime, endtime

def check_exists(ticker, timeframe):
    if not os.path.exists(f'{base_path}{ticker}_{timeframe}.csv'):
        return get_data(ticker, timeframe)
    return None

def read_data(ticker, timeframe):
    df = pd.read_csv(f'{base_path}{ticker}_{timeframe}.csv')
    return df

def delete_data(ticker, timeframe):
    try:
        os.remove(f'{base_path}{ticker}_{timeframe}.csv')
    except:
        pass
