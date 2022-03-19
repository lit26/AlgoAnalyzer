import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import RefreshIcon from '@mui/icons-material/Refresh';
import React from 'react';

import {
    deleteStockDataRequest,
    updateStockDataRequest,
} from '../../../../../apis/stockData';
import { useManager } from '../../../../../context/ManagerContext';
import { useToast } from '../../../../../context/ToastContext';
import { StockDataInfo } from '../../../../../types/data';

interface StockdataItemProps {
    stockInfo: StockDataInfo;
    handleCloseModal: () => void;
}

const StockdataItem: React.FC<StockdataItemProps> = ({
    stockInfo,
    handleCloseModal,
}) => {
    const { updateStockData, deleteStockData, setCurrentTicker } = useManager();
    const { addToast } = useToast();

    const handleStockSelect = () => {
        setCurrentTicker(stockInfo);
        handleCloseModal();
    };

    const handleStockUpdate = () => {
        updateStockDataRequest(stockInfo.ticker, stockInfo.timeframe)
            .then(res => updateStockData(res))
            .catch(err => addToast(err.response.data.msg, 'error'));
    };

    const handleStockDelete = () => {
        deleteStockDataRequest(stockInfo.ticker, stockInfo.timeframe)
            .then(() => deleteStockData(stockInfo.id))
            .catch(err => addToast(err.response.data.msg, 'error'));
    };

    return (
        <div className={`StockdataItems__item`}>
            <div>{stockInfo.timeframe}</div>
            <div>{`${stockInfo.startTime} - ${stockInfo.endTime}`}</div>
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
