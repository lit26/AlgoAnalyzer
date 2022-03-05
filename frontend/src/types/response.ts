import { StockDataInfo, Strategy, Trade, StrategyStat, Drawdown } from './data';
import { BokehEmbedPlot } from './plot';

export type PlatformRes = {
    historyData: StockDataInfo[];
    strategies: Strategy[];
};

export type BacktestRes = {
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
