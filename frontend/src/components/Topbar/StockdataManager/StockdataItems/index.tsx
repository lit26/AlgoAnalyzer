import React, { useState, useEffect } from 'react';
import { StockDataInfo } from '../../../../types/data';
import { useBacktest } from '../../../../context/BacktestContext';
import './StockdataItems.scss';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StockdataItem from './StockdataItem';

interface StockdataItemProps {
    stock: string;
    timeframe: string;
}

const StockdataItems: React.FC<StockdataItemProps> = ({ stock, timeframe }) => {
    const [stockList, setStockList] = useState<StockDataInfo[]>([]);
    const { stockDataList } = useBacktest();
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
                    />
                ))}
            </AccordionDetails>
        </Accordion>
    );
};

export default StockdataItems;
