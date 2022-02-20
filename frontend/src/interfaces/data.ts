export interface StockDataInfoProps {
    id: number;
    ticker: string;
    timeframe: string;
    startTime: string;
    endTime: string;
}

export interface TimeframeProps {
    display: string;
    value: string;
}
