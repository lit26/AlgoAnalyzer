import React, { useState, useContext } from 'react';
import { ProviderProps } from '../types/provider';
import { StockDataInfo } from '../types/data';

interface BacktestContextProps {
    stockDataList: StockDataInfo[];
    setStockDataList: React.Dispatch<React.SetStateAction<StockDataInfo[]>>;
    strategyList: string[];
    setStrategyList: React.Dispatch<React.SetStateAction<string[]>>;
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
    const [stockDataList, setStockDataList] = useState<StockDataInfo[]>([]);
    const [strategyList, setStrategyList] = useState<string[]>([]);

    const value = {
        stockDataList,
        setStockDataList,
        strategyList,
        setStrategyList,
    };

    return (
        <BacktestContext.Provider value={value}>
            {children}
        </BacktestContext.Provider>
    );
};
