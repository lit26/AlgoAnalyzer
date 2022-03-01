import React, { useState } from 'react';
import { StockDataInfo } from '../../../../../types/data';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {
    updateStockDataRequest,
    deleteStockDataRequest,
} from '../../../../../apis/stockData';
import { useManager } from '../../../../../context/ManagerContext';
import { useNotification } from '../../../../../context/NotificationContext';

interface StockdataItemProps {
    stockInfo: StockDataInfo;
    handleCloseModal: () => void;
}

const StockdataItem: React.FC<StockdataItemProps> = ({
    stockInfo,
    handleCloseModal,
}) => {
    const { updateStockData, deleteStockData, setCurrentTicker } = useManager();
    const { addNotifications } = useNotification();
    const [mouseOver, setMouseOver] = useState<boolean>(false);

    const handleStockSelect = () => {
        setCurrentTicker(stockInfo);
        handleCloseModal();
    };

    const handleStockUpdate = () => {
        updateStockDataRequest(stockInfo.ticker, stockInfo.timeframe)
            .then(res => updateStockData(res))
            .catch(err => addNotifications(err.response.data.msg, 'error'));
    };

    const handleStockDelete = () => {
        deleteStockDataRequest(stockInfo.ticker, stockInfo.timeframe)
            .then(() => deleteStockData(stockInfo.id))
            .catch(err => addNotifications(err.response.data.msg, 'error'));
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
