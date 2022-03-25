/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlatformRes } from '../types/response';
import { API_URL, apiRequest } from './util';

export const getGeneralInfoRequest = () => {
    return new Promise<PlatformRes>((resolve, reject) => {
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
                    strategies: res.strategies.map((strategy: string) => ({
                        name: strategy,
                    })),
                    savedStrategies: res.saved_strategies.map(
                        (strategy: any) => ({
                            id: strategy.id,
                            display: strategy.name,
                            timeframe: strategy.timeframe,
                            name: strategy.strategy,
                        }),
                    ),
                });
                localStorage.setItem('csrf', res.csrf);
            })
            .catch(err => reject(err));
    });
};
