export type StockDataInfo = {
    id: number;
    ticker: string;
    timeframe: string;
    startTime: string;
    endTime: string;
};

export type Timeframe = {
    display: string;
    value: string;
};

export type Strategy = {
    name: string;
    params?: any;
};
