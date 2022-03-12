import React, { useState, useContext } from 'react';
import { ProviderProps } from '../types/provider';
import { BacktestRes, BokehPlotRes } from '../types/response';
import { Sizer, StockDataInfo, StrategyParam } from '../types/data';
import {
    BokehEmbedPlot,
    BokehEmbedPlotReference,
    ChartSize,
} from '../types/plot';
import { backtestStrategy } from '../apis/strategy';

interface BacktestContextProps {
    defaultCash: number;
    setDefaultCash: React.Dispatch<React.SetStateAction<number>>;
    defaultSizer: Sizer;
    setDefaultSizer: React.Dispatch<React.SetStateAction<Sizer>>;
    backtestRunning: boolean;
    setBacktestRunning: React.Dispatch<React.SetStateAction<boolean>>;
    backtestRes?: BacktestRes;
    setBacktestRes: React.Dispatch<
        React.SetStateAction<BacktestRes | undefined>
    >;
    plotData?: BokehEmbedPlot;
    setPlotData: React.Dispatch<
        React.SetStateAction<BokehEmbedPlot | undefined>
    >;
    portfolioPlotData?: BokehEmbedPlot;
    setPortfolioPlotData: React.Dispatch<
        React.SetStateAction<BokehEmbedPlot | undefined>
    >;
    plotScales: number[];
    setPlotScales: React.Dispatch<React.SetStateAction<number[]>>;
    chartSize?: ChartSize;
    setChartSize: React.Dispatch<React.SetStateAction<ChartSize | undefined>>;
    runStrategy: (
        currentStrategyName: string,
        chartType: string,
        currentTicker?: StockDataInfo,
        param?: StrategyParam[],
        initialCash?: number,
        sizer?: Sizer,
    ) => Promise<unknown>;
    updateBacktestResult: (backtestRes: BacktestRes) => void;
    handlePlot: (res: BokehPlotRes) => void;
}

const BacktestContext = React.createContext<BacktestContextProps | undefined>(
    undefined,
);

export function useBacktest() {
    const context = useContext(BacktestContext);
    if (context === undefined) {
        throw new Error('useContext must be within Provider');
    }
    return context;
}

export const BacktestProvider: React.FC<ProviderProps> = ({ children }) => {
    const [defaultCash, setDefaultCash] = useState<number>(1000000);
    const [defaultSizer, setDefaultSizer] = useState<Sizer>({
        type: 'percentage',
        amount: 95,
    });

    const [backtestRunning, setBacktestRunning] = useState<boolean>(false);
    const [backtestRes, setBacktestRes] = useState<BacktestRes | undefined>(
        undefined,
    );

    const [plotData, setPlotData] = useState<BokehEmbedPlot | undefined>(
        undefined,
    );
    const [portfolioPlotData, setPortfolioPlotData] = useState<
        BokehEmbedPlot | undefined
    >(undefined);
    const [plotScales, setPlotScales] = useState<number[]>([]);
    const [chartSize, setChartSize] = useState<ChartSize | undefined>(
        undefined,
    );

    const validateParams = (params: StrategyParam[]) => {
        let postParams = {};
        if (params) {
            const checkMissing = params.find(param => !param.current);
            if (checkMissing) {
                return;
            }
            postParams = Object.assign(
                {},
                ...params.map(param => ({
                    [param.name]: param.current,
                })),
            );
        }
        return postParams;
    };

    const runStrategy = (
        currentStrategyName: string,
        chartType: string,
        currentTicker?: StockDataInfo,
        params?: StrategyParam[],
        initialCash: number = defaultCash,
        sizer: Sizer = defaultSizer,
    ) => {
        return new Promise((resolve, reject) => {
            if (currentStrategyName === '') {
                reject({ msg: 'No strategy is selected.' });
                return;
            }
            if (!currentTicker || !params) {
                setBacktestRunning(false);
                reject({ msg: 'You are missing stock.' });
                return;
            }
            const postParams = validateParams(params);
            if (!postParams) {
                reject({ msg: 'You are missing input parameters.' });
                setBacktestRunning(false);
            } else {
                backtestStrategy(
                    currentStrategyName,
                    currentTicker.ticker,
                    currentTicker.timeframe,
                    chartType,
                    postParams,
                    initialCash,
                    sizer,
                )
                    .then((res: BacktestRes) => {
                        updateBacktestResult(res);
                        resolve({ msg: 'Backtest successfully.' });
                    })
                    .catch(err => {
                        console.error(err);
                        setBacktestRunning(false);
                        reject({ msg: 'Fail to run strategy.' });
                    });
            }
        });
    };

    const updateBacktestResult = (backtestRes: BacktestRes) => {
        setBacktestRes(backtestRes);
        handlePlot(backtestRes.plot);
        setPortfolioPlotData(backtestRes.portfolio.plotdata);
        setBacktestRunning(false);
    };

    const handlePlot = (res: BokehPlotRes) => {
        const totalHeight = res.pscale.reduce(
            (acc: number, height: number) => acc + height,
            0,
        );
        setPlotScales(
            res.plotdata.doc.roots.references.map(
                (reference: BokehEmbedPlotReference) =>
                    reference.subtype && reference.subtype === 'Figure'
                        ? reference.attributes.height / totalHeight
                        : 0,
            ),
        );
        setPlotData(res.plotdata);
    };

    const value = {
        defaultCash,
        setDefaultCash,
        defaultSizer,
        setDefaultSizer,
        backtestRunning,
        setBacktestRunning,
        backtestRes,
        setBacktestRes,
        plotData,
        setPlotData,
        portfolioPlotData,
        setPortfolioPlotData,
        plotScales,
        setPlotScales,
        chartSize,
        setChartSize,
        runStrategy,
        updateBacktestResult,
        handlePlot,
    };

    return (
        <BacktestContext.Provider value={value}>
            {children}
        </BacktestContext.Provider>
    );
};
