import React, { useState, useEffect } from 'react';
import { StockDataInfo } from '../../../../types/data';
import { useManager } from '../../../../context/ManagerContext';
import './StockdataItems.scss';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StockdataItem from './StockdataItem';

interface StockdataItemProps {
    expand: string | false;
    handlePanelChange: (
        panel: string,
    ) => (event: React.SyntheticEvent, newExpanded: boolean) => void;
    stock: string;
    timeframe: string;
    handleCloseModal: () => void;
}

const StockdataItems: React.FC<StockdataItemProps> = ({
    expand,
    handlePanelChange,
    stock,
    timeframe,
    handleCloseModal,
}) => {
    const [stockList, setStockList] = useState<StockDataInfo[]>([]);
    const { stockDataList } = useManager();
    const [mouseOver, setMouseOver] = useState<boolean>(false);

    useEffect(() => {
        let tmp = stockDataList.filter(stockData => stockData.ticker === stock);
        if (timeframe !== '') {
            tmp = tmp.filter(stockData => stockData.timeframe === timeframe);
        }
        setStockList(tmp);
    }, [stockDataList, stock, timeframe]);

    return (
        <Accordion
            expanded={expand === `panel_${stock}`}
            onChange={handlePanelChange(`panel_${stock}`)}
            className={`StockdataItems ${mouseOver ? 'mouseOver' : ''}`}
            onMouseOver={() => setMouseOver(true)}
            onMouseOut={() => setMouseOver(false)}>
            <AccordionSummary
                expandIcon={
                    <ExpandMoreIcon className="StockdataItem__expandIcon" />
                }
                aria-controls="panel1a-content">
                <Typography>{stock}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {stockList.map(stockInfo => (
                    <StockdataItem
                        key={`stockDataInfo_${stock}_${stockInfo.timeframe}`}
                        stockInfo={stockInfo}
                        handleCloseModal={handleCloseModal}
                    />
                ))}
            </AccordionDetails>
        </Accordion>
    );
};

export default StockdataItems;
