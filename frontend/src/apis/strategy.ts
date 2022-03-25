import { Sizer, Strategy } from '../types/data';
import { BacktestRes, SavedStrategyRes } from '../types/response';
import { API_URL, apiRequest } from './util';

export const getStrategyParams = (strategy: string) => {
    return apiRequest(`${API_URL}/api/v1/strategy/${strategy}`, 'GET');
};

const formatRes = (res: SavedStrategyRes) => {
    return {
        id: res.id,
        display: res.name,
        timeframe: res.timeframe,
        name: res.strategy,
        params: res.parameters,
    };
};

export const getSavedStrategyParams = (strategyId: number) => {
    return new Promise<Strategy>((resolve, reject) => {
        apiRequest(`${API_URL}/api/v1/savedstrategy/${strategyId}`, 'GET')
            .then((res: SavedStrategyRes) => resolve(formatRes(res)))
            .catch(err => reject(err));
    });
};

export const saveSavedStrategyParams = (
    strategy: Strategy,
    timeframe: string,
) => {
    return new Promise<Strategy>((resolve, reject) => {
        apiRequest(`${API_URL}/api/v1/savedstrategy`, 'POST', {
            strategy: strategy.name,
            timeframe,
            name: strategy.display,
            params: strategy.params,
        })
            .then((res: SavedStrategyRes) => resolve(formatRes(res)))
            .catch(err => reject(err));
    });
};

export const updateSavedStrategyParams = (
    strategy: Strategy,
    timeframe: string,
) => {
    return new Promise<Strategy>((resolve, reject) => {
        apiRequest(`${API_URL}/api/v1/savedstrategy/${strategy.id}`, 'PUT', {
            strategy: strategy.name,
            timeframe,
            name: strategy.display,
            params: strategy.params,
        })
            .then((res: SavedStrategyRes) => resolve(formatRes(res)))
            .catch(err => reject(err));
    });
};

export const deleteSavedStrategyParams = (strategyId: number) => {
    return apiRequest(
        `${API_URL}/api/v1/savedstrategy/${strategyId}`,
        'DELETE',
    );
};

export const backtestStrategy = (
    strategy: string,
    ticker: string,
    timeframe: string,
    plotkind: string,
    params: { [key: string]: number | string | boolean },
    cash: number,
    sizer: Sizer,
) => {
    return new Promise<BacktestRes>((resolve, reject) => {
        apiRequest(`${API_URL}/api/v1/strategy/${strategy}`, 'POST', {
            ticker,
            timeframe,
            plotkind,
            params,
            cash,
            sizer,
        })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
