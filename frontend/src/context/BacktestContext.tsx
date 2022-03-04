import React, { useState, useContext } from 'react';
import { ProviderProps } from '../types/provider';
import { BacktestRes } from '../types/response';
import { Trade } from '../types/data';
import { BokehEmbedPlot, BokehEmbedPlotReference } from '../types/plot';

interface BacktestContextProps {
    trades?: Trade[];
    setTrades: React.Dispatch<React.SetStateAction<Trade[] | undefined>>;
    plotData?: BokehEmbedPlot;
    setPlotData: React.Dispatch<
        React.SetStateAction<BokehEmbedPlot | undefined>
    >;
    plotScales: number[];
    setPlotScales: React.Dispatch<React.SetStateAction<number[]>>;
    chartHeight: number;
    setChartHeight: React.Dispatch<React.SetStateAction<number>>;
    updateBacktestResult: (backtestRes: BacktestRes) => void;
    handlePlot: (res: any) => void;
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
    const [trades, setTrades] = useState<Trade[] | undefined>(undefined);
    const [plotData, setPlotData] = useState<BokehEmbedPlot | undefined>(
        undefined,
    );
    const [chartHeight, setChartHeight] = useState<number>(0);
    const [plotScales, setPlotScales] = useState<number[]>([]);

    const updateBacktestResult = (backtestRes: BacktestRes) => {
        setTrades(backtestRes.trades);
    };

    const handlePlot = (res: any) => {
        setPlotScales(
            res.doc.roots.references.map((reference: BokehEmbedPlotReference) =>
                reference.subtype && reference.subtype === 'Figure'
                    ? reference.attributes.height / 100
                    : 0,
            ),
        );
        setPlotData(res);
    };

    const value = {
        trades,
        setTrades,
        plotData,
        setPlotData,
        plotScales,
        setPlotScales,
        chartHeight,
        setChartHeight,
        updateBacktestResult,
        handlePlot,
    };

    return (
        <BacktestContext.Provider value={value}>
            {children}
        </BacktestContext.Provider>
    );
};
