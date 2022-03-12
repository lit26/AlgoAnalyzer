/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL, apiRequest } from './util';
import { PlatformRes } from '../types/response';

export const getGeneralInfoRequest = () => {
    return new Promise<PlatformRes>((resolve, reject) => {
        apiRequest(`${API_URL}/api/v1/data`, 'GET')
            .then((res: any) =>
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
                }),
            )
            .catch(err => reject(err));
    });
};
