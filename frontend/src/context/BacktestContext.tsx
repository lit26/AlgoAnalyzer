import React, { useState, useContext } from 'react';
import { ProviderProps } from '../types/provider';
import { BacktestRes, BokehPlotRes } from '../types/response';
import { Trade, Sizer } from '../types/data';
import {
    BokehEmbedPlot,
    BokehEmbedPlotReference,
    ChartSize,
} from '../types/plot';

interface BacktestContextProps {
    defaultCash: number;
    setDefaultCash: React.Dispatch<React.SetStateAction<number>>;
    defaultSizer: Sizer;
    setDefaultSizer: React.Dispatch<React.SetStateAction<Sizer>>;
    backtestRunning: boolean;
    setBacktestRunning: React.Dispatch<React.SetStateAction<boolean>>;
    trades?: Trade[];
    setTrades: React.Dispatch<React.SetStateAction<Trade[] | undefined>>;
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
        type: 'fix',
        amount: 10,
    });

    const [backtestRunning, setBacktestRunning] = useState<boolean>(false);
    const [trades, setTrades] = useState<Trade[] | undefined>(undefined);
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

    const updateBacktestResult = (backtestRes: BacktestRes) => {
        setTrades(backtestRes.trades);
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
        trades,
        setTrades,
        plotData,
        setPlotData,
        portfolioPlotData,
        setPortfolioPlotData,
        plotScales,
        setPlotScales,
        chartSize,
        setChartSize,
        updateBacktestResult,
        handlePlot,
    };

    return (
        <BacktestContext.Provider value={value}>
            {children}
        </BacktestContext.Provider>
    );
};
