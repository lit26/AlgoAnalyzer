import { API_URL, apiRequest } from './util';
import { BacktestRes } from '../types/response';
import { Sizer } from '../types/data';

export const getStrategyParams = (strategy: string) => {
    return apiRequest(`${API_URL}/api/v1/strategy/${strategy}`, 'GET');
};

export const backtestStrategy = (
    strategy: string,
    ticker: string,
    timeframe: string,
    params: any,
    cash: number,
    sizer: Sizer,
) => {
    return new Promise<BacktestRes>((resolve, reject) => {
        apiRequest(`${API_URL}/api/v1/strategy/${strategy}`, 'POST', {
            ticker,
            timeframe,
            params,
            cash,
            sizer,
        })
            .then((res: any) =>
                resolve({
                    ...res,
                    plot: {
                        ...res.plot,
                        plotdata: JSON.parse(res.plot.plotdata),
                    },
                    portfolio: {
                        ...res.portfolio,
                        plotdata: JSON.parse(res.portfolio.plotdata),
                    },
                }),
            )
            .catch(err => reject(err));
    });
};
