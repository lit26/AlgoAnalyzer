import { API_URL, apiRequest } from './util';

export const getGeneralInfo = () => {
    return new Promise((resolve, reject) => {
        apiRequest(`${API_URL}/api/v1/data`, 'GET')
            .then((res: any) => {
                resolve({
                    historyData: res.history_data.map((stockDataInfo: any) => ({
                        id: stockDataInfo.id,
                        ticker: stockDataInfo.ticker,
                        timeframe: stockDataInfo.timeframe,
                        startTime: stockDataInfo.start_time,
                        endTime: stockDataInfo.end_time,
                    })),
                    strategies: res.strategies,
                });
            })
            .catch(err => {
                reject(err);
            });
    });
};

export const updateStockData = (ticker: string, timeframe: string) => {
    return new Promise((resolve, reject) => {
        apiRequest(`${API_URL}/api/v1/stockdata`, 'POST', {
            ticker,
            timeframe,
        })
            .then((res: any) => {
                resolve({
                    id: res.id,
                    ticker: res.ticker,
                    timeframe: res.timeframe,
                    startTime: res.start_time,
                    endTime: res.end_time,
                });
            })
            .catch(err => {
                reject(err);
            });
    });
};

export const deleteStockData = (ticker: string, timeframe: string) => {
    return apiRequest(`${API_URL}/api/v1/stockdata`, 'DELETE', {
        ticker,
        timeframe,
    });
};
