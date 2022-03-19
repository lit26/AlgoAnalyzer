import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import React, { useEffect, useState } from 'react';

import { useManager } from '../../../context/ManagerContext';
import TopbarSelect from '../TopbarSelect';

const chartList = [
    {
        name: 'candlestick',
        Icon: CandlestickChartIcon,
    },
    { name: 'line', Icon: ShowChartIcon },
];

const ChartSelect: React.FC = () => {
    const { chartType, setChartType } = useManager();

    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const handleChange = (index: number) => {
        setChartType(chartList[index].name);
    };

    useEffect(() => {
        const chartIndex = chartList.findIndex(
            chart => chart.name === chartType,
        );
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
