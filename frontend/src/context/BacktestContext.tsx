import React, { useState, useContext } from 'react';
import { ProviderProps } from '../types/provider';
import { StockDataInfo, Strategy } from '../types/data';

interface BacktestContextProps {
    currentTicker: StockDataInfo | undefined;
    setCurrentTicker: React.Dispatch<
        React.SetStateAction<StockDataInfo | undefined>
    >;
    currentStrategy: Strategy;
    setCurrentStrategy: React.Dispatch<React.SetStateAction<Strategy>>;
    stockDataList: StockDataInfo[];
    setStockDataList: React.Dispatch<React.SetStateAction<StockDataInfo[]>>;
    strategyList: Strategy[];
    setStrategyList: React.Dispatch<React.SetStateAction<Strategy[]>>;
    addStockData: (stockData: StockDataInfo) => void;
    updateStockData: (updateData: StockDataInfo) => void;
    deleteStockData: (deleteStockDataId: number) => void;
    deleteMultipleStockData: (deleteStockDataIds: number[]) => void;
    updateCurrentStrategy: (selectStrategy: Strategy) => void;
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
    const [currentStrategy, setCurrentStrategy] = useState<Strategy>({
        name: '',
    });
    const [stockDataList, setStockDataList] = useState<StockDataInfo[]>([]);
    const [strategyList, setStrategyList] = useState<Strategy[]>([]);

    // managing stock data
    const addStockData = (stockData: StockDataInfo) => {
        if (
            stockDataList.find(oldStockData => oldStockData.id === stockData.id)
        ) {
            updateStockData(stockData);
        } else {
            setStockDataList([stockData, ...stockDataList]);
        }
    };
    const updateStockData = (updateData: StockDataInfo) => {
        setStockDataList(
            stockDataList.map(stockData =>
                stockData.id === updateData.id ? updateData : stockData,
            ),
        );
    };

    const deleteMultipleStockData = (deleteStockDataIds: number[]) => {
        setStockDataList(
            stockDataList.filter(
                stockData => !deleteStockDataIds.includes(stockData.id),
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

    // managing Strategies
    const updateCurrentStrategy = (selectStrategy: Strategy) => {
        setCurrentStrategy(selectStrategy);
        setStrategyList(
            strategyList.map(strategy =>
                strategy.name === selectStrategy.name
                    ? selectStrategy
                    : strategy,
            ),
        );
    };

    const value = {
        currentTicker,
        setCurrentTicker,
        currentStrategy,
        setCurrentStrategy,
        stockDataList,
        setStockDataList,
        strategyList,
        setStrategyList,
        addStockData,
        updateStockData,
        deleteStockData,
        deleteMultipleStockData,
        updateCurrentStrategy,
    };

    return (
        <BacktestContext.Provider value={value}>
            {children}
        </BacktestContext.Provider>
    );
};
