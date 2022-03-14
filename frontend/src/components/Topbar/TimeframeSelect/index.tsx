import React, { useState, useEffect } from 'react';
import { useManager } from '../../../context/ManagerContext';
import { StockDataInfo } from '../../../types/data';
import TopbarSelect from '../TopbarSelect';
import { TIMEFRAMES } from '../../../constants';

const TimeframeSelect: React.FC = () => {
    const { currentTicker, stockDataList, setCurrentTicker } = useManager();
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const timeframeList =
        currentTicker && stockDataList
            ? stockDataList.reduce(
                  (acc: { name: string }[], stock: StockDataInfo) =>
                      stock.ticker === currentTicker.ticker
                          ? acc.concat({ name: stock.timeframe })
                          : acc,
                  [],
              )
            : [];

    timeframeList.sort(
        (a, b) =>
            TIMEFRAMES.findIndex(timeframe => timeframe.value === a.name) -
            TIMEFRAMES.findIndex(timeframe => timeframe.value === b.name),
    );

    const handleTimeframeChange = (index: number) => {
        const findTicker =
            currentTicker &&
            stockDataList.find(
                stockData =>
                    stockData.ticker === currentTicker.ticker &&
                    stockData.timeframe === timeframeList[index].name,
            );
        if (findTicker) {
            setCurrentTicker(findTicker);
        }
    };

    useEffect(() => {
        const timeFrameIndex = timeframeList.findIndex(
            timeframe => timeframe.name === currentTicker?.timeframe,
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
