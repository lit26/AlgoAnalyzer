import React, { useEffect, useState } from 'react';

import { useManager } from '../../../../context/ManagerContext';
import { StockDataInfo } from '../../../../types/data';
import StockdataItem from './StockdataItem';
import './StockdataItems.scss';

interface StockdataItemsProps {
    stock: string;
    timeframe: string;
    handleCloseModal: () => void;
}

const StockdataItems: React.FC<StockdataItemsProps> = ({
    stock,
    timeframe,
    handleCloseModal,
}) => {
    const [stockList, setStockList] = useState<StockDataInfo[]>([]);
    const { stockDataList } = useManager();

    useEffect(() => {
        let tmp = stockDataList.filter(stockData => stockData.ticker === stock);
        if (timeframe !== '') {
            tmp = tmp.filter(stockData => stockData.timeframe === timeframe);
        }
        setStockList(tmp);
    }, [stockDataList, stock, timeframe]);

    return (
        <>
            {stockList.map(stockItem => (
                <StockdataItem
                    key={`stock_${stock}_${stockItem.timeframe}`}
                    stockInfo={stockItem}
                    handleCloseModal={handleCloseModal}
                />
            ))}
        </>
    );
};

export default StockdataItems;
