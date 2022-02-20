import React, { useState, useContext } from 'react';
import { ProviderProps } from '../types/provider';
import { StockDataInfo } from '../types/data';

interface BacktestContextProps {
    currentTicker: StockDataInfo | undefined;
    setCurrentTicker: React.Dispatch<
        React.SetStateAction<StockDataInfo | undefined>
    >;
    stockDataList: StockDataInfo[];
    setStockDataList: React.Dispatch<React.SetStateAction<StockDataInfo[]>>;
    strategyList: string[];
    setStrategyList: React.Dispatch<React.SetStateAction<string[]>>;
    addStockData: (stockData: StockDataInfo) => void;
    updateStockData: (updateData: StockDataInfo) => void;
    deleteStockData: (deleteStockDataId: number) => void;
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
    const [currentTicker, setCurrentTicker] = useState<
        StockDataInfo | undefined
    >(undefined);
    const [stockDataList, setStockDataList] = useState<StockDataInfo[]>([]);
    const [strategyList, setStrategyList] = useState<string[]>([]);

    const addStockData = (stockData: StockDataInfo) => {
        setStockDataList([stockData, ...stockDataList]);
    };
    const updateStockData = (updateData: StockDataInfo) => {
        setStockDataList(
            stockDataList.map(stockData =>
                stockData.id === updateData.id ? updateData : stockData,
            ),
        );
    };

    const deleteStockData = (deleteStockDataId: number) => {
        setStockDataList(
            stockDataList.filter(
                stockData => stockData.id !== deleteStockDataId,
            ),
        );
    };

    const value = {
        currentTicker,
        setCurrentTicker,
        stockDataList,
        setStockDataList,
        strategyList,
        setStrategyList,
        addStockData,
        updateStockData,
        deleteStockData,
    };

    return (
        <BacktestContext.Provider value={value}>
            {children}
        </BacktestContext.Provider>
    );
};
