import React, { useState, useEffect } from 'react';
import { useManager } from '../../../context/ManagerContext';
import { StockDataInfo } from '../../../types/data';
import TopbarSelect from '../TopbarSelect';

const TimeframeSelect: React.FC = () => {
    const { currentTicker, stockDataList, setCurrentTicker } = useManager();
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const timeframeList =
        currentTicker && stockDataList
            ? stockDataList.reduce(
                  (acc: string[], stock: StockDataInfo) =>
                      stock.ticker === currentTicker.ticker
                          ? acc.concat(stock.timeframe)
                          : acc,
                  [],
              )
            : [];

    const handleTimeframeChange = (index: number) => {
        const findTicker =
            currentTicker &&
            stockDataList.find(
                stockData =>
                    stockData.ticker === currentTicker.ticker &&
                    stockData.timeframe === timeframeList[index],
            );
        if (findTicker) {
            setCurrentTicker(findTicker);
        }
    };

    useEffect(() => {
        const timeFrameIndex = timeframeList.findIndex(
            timeframe => timeframe === currentTicker?.timeframe,
        );
        if (timeFrameIndex >= 0) {
            setSelectedIndex(timeFrameIndex);
        }
    }, [stockDataList, currentTicker]);

    return (
        <TopbarSelect
            name="timeframe"
            selectedIndex={selectedIndex}
            handleChange={handleTimeframeChange}
            menuList={timeframeList}
        />
    );
};

export default TimeframeSelect;
