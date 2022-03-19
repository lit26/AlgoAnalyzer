/* eslint-disable @typescript-eslint/no-explicit-any */
import { Drawdown, StockDataInfo, Strategy, StrategyStat, Trade } from './data';
import { BokehEmbedPlot } from './plot';

export type PlatformRes = {
    historyData: StockDataInfo[];
    strategies: Strategy[];
};

export type BacktestRes = {
    ticker: string;
    timeframe: string;
    strategy: string;
    stat: StrategyStat;
    trades: Trade[];
    plot: any;
    drawdown: Drawdown;
    portfolio: any;
};

export type BokehPlotRes = {
    plotdata: BokehEmbedPlot;
    pscale: number[];
};

export type NoteRes = {
    id: number;
    title: string;
    content: string;
    relate_stock: string;
    relate_strategy: string;
    created_at?: string;
    updated_at?: string;
};
