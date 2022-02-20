import React, { useState } from 'react';
import { StockDataInfo } from '../../../../../types/data';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {
    updateStockDataRequest,
    deleteStockDataRequest,
} from '../../../../../apis/stockData';
import { useBacktest } from '../../../../../context/BacktestContext';

interface StockdataItemProps {
    stockInfo: StockDataInfo;
}

const StockdataItem: React.FC<StockdataItemProps> = ({ stockInfo }) => {
    const { updateStockData, deleteStockData, setCurrentTicker } =
        useBacktest();
    const [mouseOver, setMouseOver] = useState<boolean>(false);

    const handleStockSelect = () => {
        setCurrentTicker(stockInfo);
    };

    const handleStockUpdate = () => {
        updateStockDataRequest(stockInfo.ticker, stockInfo.timeframe)
            .then(res => updateStockData(res))
            .catch(err => console.log(err));
    };

    const handleStockDelete = () => {
        deleteStockDataRequest(stockInfo.ticker, stockInfo.timeframe)
            .then(() => deleteStockData(stockInfo.id))
            .catch(err => console.log(err));
    };

    return (
        <div
            className={`StockdataItems__item ${mouseOver ? 'mouseOver' : ''}`}
            onMouseOver={() => setMouseOver(true)}
            onMouseOut={() => setMouseOver(false)}>
            <div>{stockInfo.timeframe}</div>
            <div>
                <div>{`${stockInfo.startTime}-`}</div>
                <div>{stockInfo.endTime}</div>
            </div>
            <div className="StockdataItems__itemActions">
                <KeyboardReturnIcon onClick={handleStockSelect} />
                <RefreshIcon onClick={handleStockUpdate} />
                <DeleteOutlineIcon
                    className="StockdataItems__itemDeleteIcon"
                    onClick={handleStockDelete}
                />
            </div>
        </div>
    );
};

export default StockdataItem;
