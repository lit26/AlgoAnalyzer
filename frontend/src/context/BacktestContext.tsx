import React, { useState, useEffect, useContext } from 'react';
import { ProviderProps } from '../interfaces/provider';
import { StockDataInfoProps } from '../interfaces/data';

interface BacktestContextProps {
    stockDataList: StockDataInfoProps[];
    setStockDataList: React.Dispatch<
        React.SetStateAction<StockDataInfoProps[]>
    >;
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
    const [stockDataList, setStockDataList] = useState<StockDataInfoProps[]>(
        [],
    );
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
