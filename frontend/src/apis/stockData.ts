/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL, apiRequest } from './util';
import { StockDataInfo } from '../types/data';
import { BokehPlotRes } from '../types/response';

export const getStockDataRequest = (
    ticker: string,
    timeframe: string,
    plotkind: string,
) => {
    return new Promise<BokehPlotRes>((resolve, reject) => {
        apiRequest(
            `${API_URL}/api/v1/stockdata/ticker=${ticker}&timeframe=${timeframe}&plotkind=${plotkind}`,
            'GET',
        )
            .then((res: any) => {
                resolve({
                    ...res,
                    plotdata: JSON.parse(res.plotdata),
                });
            })
            .catch(err => {
                reject(err);
            });
    });
};

export const updateStockDataRequest = (ticker: string, timeframe: string) => {
    return new Promise<StockDataInfo>((resolve, reject) => {
        apiRequest(`${API_URL}/api/v1/stockdata`, 'POST', {
            ticker,
            timeframe,
        })
            .then((res: any) =>
                resolve({
                    id: res.id,
                    ticker: res.ticker,
                    timeframe: res.timeframe,
                    startTime: res.start_time,
                    endTime: res.end_time,
                }),
            )
            .catch(err => reject(err));
    });
};

export const deleteStockDataRequest = (ticker: string, timeframe: string) => {
    return apiRequest(`${API_URL}/api/v1/stockdata`, 'DELETE', {
        ticker,
        timeframe,
    });
};
