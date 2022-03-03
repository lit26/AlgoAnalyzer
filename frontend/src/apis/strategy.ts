import { API_URL, apiRequest } from './util';
import { BacktestRes } from '../types/response';

export const getStrategyParams = (strategy: string) => {
    return apiRequest(`${API_URL}/api/v1/strategy/${strategy}`, 'GET');
};

export const backtestStrategy = (
    strategy: string,
    ticker: string,
    timeframe: string,
    params: any,
) => {
    return new Promise<BacktestRes>((resolve, reject) => {
        apiRequest(`${API_URL}/api/v1/strategy/${strategy}`, 'POST', {
            ticker,
            timeframe,
            params,
        })
            .then((res: any) =>
                resolve({
                    ...res,
                    plot: JSON.parse(res.plot),
                }),
            )
            .catch(err => reject(err));
    });
};
