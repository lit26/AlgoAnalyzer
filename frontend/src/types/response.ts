import { StockDataInfo, Strategy, Trade } from './data';

export type PlatformRes = {
    historyData: StockDataInfo[];
    strategies: Strategy[];
};

export type BacktestRes = {
    trades: Trade[];
};
