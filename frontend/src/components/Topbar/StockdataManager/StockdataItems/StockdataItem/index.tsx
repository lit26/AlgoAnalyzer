import React, { useState } from 'react';
import { StockDataInfo } from '../../../../../types/data';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface StockdataItemProps {
    stockInfo: StockDataInfo;
}

const StockdataItem: React.FC<StockdataItemProps> = ({ stockInfo }) => {
    const [mouseOver, setMouseOver] = useState<boolean>(false);

    const handleStockUpdate = () => {};

    const handleStockDelete = () => {};

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
                <RefreshIcon onClick={() => handleStockUpdate()} />
                <DeleteOutlineIcon
                    className="StockdataItems__itemDeleteIcon"
                    onClick={() => handleStockDelete()}
                />
            </div>
        </div>
    );
};

export default StockdataItem;
