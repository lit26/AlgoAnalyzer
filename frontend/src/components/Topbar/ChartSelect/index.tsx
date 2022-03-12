import React, { useState, useEffect } from 'react';
import { useManager } from '../../../context/ManagerContext';
import TopbarSelect from '../TopbarSelect';

const chartList = ['candlestick', 'line'];

const ChartSelect: React.FC = () => {
    const { chartType, setChartType } = useManager();

    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const handleChange = (index: number) => {
        setChartType(chartList[index]);
    };

    useEffect(() => {
        const chartIndex = chartList.findIndex(chart => chart === chartType);
        if (chartIndex >= 0) {
            setSelectedIndex(chartIndex);
        }
    }, [chartType]);

    return (
        <TopbarSelect
            name="chart"
            selectedIndex={selectedIndex}
            handleChange={handleChange}
            menuList={chartList}
        />
    );
};

export default ChartSelect;
