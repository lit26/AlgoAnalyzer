import React, { useContext, useEffect, useState } from 'react';

import { StockDataInfo, Strategy } from '../types/data';
import { ProviderProps } from '../types/provider';

interface ManagerContextProps {
    currentTicker: StockDataInfo | undefined;
    setCurrentTicker: React.Dispatch<
        React.SetStateAction<StockDataInfo | undefined>
    >;
    chartType: string;
    setChartType: React.Dispatch<React.SetStateAction<string>>;
    currentStrategy: Strategy;
    setCurrentStrategy: React.Dispatch<React.SetStateAction<Strategy>>;
    stockDataList: StockDataInfo[];
    setStockDataList: React.Dispatch<React.SetStateAction<StockDataInfo[]>>;
    strategyList: Strategy[];
    setStrategyList: React.Dispatch<React.SetStateAction<Strategy[]>>;
    savedStrategyList: Strategy[];
    setSavedStrategyList: React.Dispatch<React.SetStateAction<Strategy[]>>;
    addStockData: (stockData: StockDataInfo) => void;
    updateStockData: (updateData: StockDataInfo) => void;
    deleteStockData: (deleteStockDataId: number) => void;
    deleteMultipleStockData: (deleteStockDataIds: number[]) => void;
    selectCurrentStrategy: (selectStrategy: Strategy) => void;
    updateCurrentStrategy: (selectStrategy: Strategy) => void;
    deleteSavedStrategy: (selectStrategyId: number) => void;
}

const ManagerContext = React.createContext<ManagerContextProps | undefined>(
    undefined,
);

export function useManager() {
    const context = useContext(ManagerContext);
    if (context === undefined) {
        throw new Error('useContext must be within Provider');
    }
    return context;
}

export const ManagerProvider: React.FC<ProviderProps> = ({ children }) => {
    const [currentTicker, setCurrentTicker] = useState<
        StockDataInfo | undefined
    >(undefined);
    const [currentStrategy, setCurrentStrategy] = useState<Strategy>({
        name: '',
    });
    const [chartType, setChartType] = useState<string>('candlestick');
    const [stockDataList, setStockDataList] = useState<StockDataInfo[]>([]);
    const [strategyList, setStrategyList] = useState<Strategy[]>([]);
    const [savedStrategyList, setSavedStrategyList] = useState<Strategy[]>([]);

    // save manager strategy input information
    useEffect(() => {
        if (currentStrategy.name !== '') {
            localStorage.setItem('strategy', JSON.stringify(currentStrategy));
        }
    }, [currentStrategy]);

    // load manager strategy input information
    useEffect(() => {
        if (localStorage.getItem('strategy') !== null) {
            const saveStrategyStr = localStorage.getItem('strategy');
            if (saveStrategyStr) {
                const saveStrategy: Strategy = JSON.parse(saveStrategyStr);

                // check if the strategy exist
                if (
                    currentStrategy.name === '' &&
                    strategyList.find(
                        strategy => strategy.name === saveStrategy.name,
                    )
                ) {
                    setCurrentStrategy(saveStrategy);
                }
            }
        }
    }, [strategyList]);

    useEffect(() => {
        if (stockDataList.length > 0 && !currentTicker) {
            setCurrentTicker(stockDataList[0]);
        }
    }, [stockDataList]);

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
    const selectCurrentStrategy = (selectStrategy: Strategy) => {
        if (selectStrategy.params) {
            setCurrentStrategy({
                ...selectStrategy,
                name: selectStrategy.name,
                params: selectStrategy.params.map(param => ({
                    ...param,
                    current: param.current ? param.current : param.default,
                })),
            });
        }
    };

    const updateCurrentStrategy = (selectStrategy: Strategy) => {
        if (!selectStrategy.id) {
            setStrategyList(
                strategyList.map(strategy =>
                    strategy.name === selectStrategy.name
                        ? selectStrategy
                        : strategy,
                ),
            );
        } else {
            setSavedStrategyList(
                savedStrategyList.map(strategy =>
                    strategy.id === selectStrategy.id
                        ? selectStrategy
                        : strategy,
                ),
            );
        }
        selectCurrentStrategy(selectStrategy);
    };

    const deleteSavedStrategy = (selectStrategyId: number) => {
        const newSavedStrategyList = savedStrategyList.filter(
            strategy => strategy.id !== selectStrategyId,
        );
        if (currentStrategy.id && currentStrategy.id === selectStrategyId) {
            setCurrentStrategy({ name: '' });
        }
        setSavedStrategyList(newSavedStrategyList);
    };

    const value = {
        currentTicker,
        setCurrentTicker,
        currentStrategy,
        setCurrentStrategy,
        chartType,
        setChartType,
        stockDataList,
        setStockDataList,
        strategyList,
        setStrategyList,
        savedStrategyList,
        setSavedStrategyList,
        addStockData,
        updateStockData,
        deleteStockData,
        deleteMultipleStockData,
        selectCurrentStrategy,
        updateCurrentStrategy,
        deleteSavedStrategy,
    };

    return (
        <ManagerContext.Provider value={value}>
            {children}
        </ManagerContext.Provider>
    );
};
