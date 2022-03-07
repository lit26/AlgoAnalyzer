import React, { useState, useEffect } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import StockdataItem from './StockdataItem';
import TreeView from '@mui/lab/TreeView';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import StockdataItem from './StockdataItem';
import TreeItem from '@mui/lab/TreeItem';
import { StockDataInfo } from '../../../../types/data';
import { useManager } from '../../../../context/ManagerContext';
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
