import { API_URL, apiRequest } from './util';

export const getGeneralInfoRequest = () => {
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