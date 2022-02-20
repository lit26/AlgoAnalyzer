import React, { useState, useEffect } from 'react';
import CustomButton from '../../CustomButton';
import './StockdataManager.scss';
import SearchIcon from '@mui/icons-material/Search';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import InputBase from '@mui/material/InputBase';
import { useBacktest } from '../../../context/BacktestContext';
import StockdataItems from './StockdataItems';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { TIMEFRAMES } from '../../../constants';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { updateStockDataRequest } from '../../../apis/stockData';

const StockdataManager: React.FC = () => {
    const [stockList, setStockList] = useState<string[]>([]);
    const [timeframe, setTimeframe] = useState<string>('');
    const [stockDataManagerModalOpen, setStockDataManagerModalOpen] =
        useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const { currentTicker, stockDataList, addStockData } = useBacktest();
    const [errorTimeframe, setErrorTimeframe] = useState<boolean>(false);

    useEffect(() => {
        setStockList([...new Set(stockDataList.map(stock => stock.ticker))]);
    }, [stockDataList]);

    useEffect(() => {
        let tmp = stockDataList;
        if (search !== '') {
            tmp = stockDataList.filter(stock =>
                stock.ticker.includes(search.toUpperCase()),
            );
        }
        if (timeframe !== '') {
            tmp = tmp.filter(stock => stock.timeframe === timeframe);
        }

        setStockList([...new Set(tmp.map(stock => stock.ticker))]);
    }, [search, timeframe, stockDataList]);

    const handleTimeframeChange = (e: SelectChangeEvent) => {
        setTimeframe(e.target.value);
    };

    const handleAddTicker = () => {
        if (timeframe === '') {
            setErrorTimeframe(true);
            return;
        } else if (timeframe !== '') {
            setErrorTimeframe(false);
        }
        updateStockDataRequest(search, timeframe)
            .then(res => addStockData(res))
            .catch(err => console.log(err));
    };

    const handleDeleteTicker = () => {};

    const handleCloseStockDataManager = () => {
        setStockDataManagerModalOpen(false);
    };

    return (
        <>
            <CustomButton
                onClick={() =>
                    setStockDataManagerModalOpen(!stockDataManagerModalOpen)
                }
                text={currentTicker ? currentTicker.ticker : 'Data'}
            />

            <Modal
                open={stockDataManagerModalOpen}
                onClose={handleCloseStockDataManager}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}>
                <div className="StockdataManager">
                    <h1>Stock data</h1>
                    <hr />
                    {/* Search bar */}
                    <div className="Searchbar">
                        <div className="Searchbar__tickerInput">
                            <div className="Searchbar__iconWrapper">
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Type to search or add"
                                value={search}
                                onChange={e =>
                                    setSearch(e.target.value.toUpperCase())
                                }
                            />
                        </div>
                        <div>
                            <FormControl
                                variant="standard"
                                sx={{
                                    s: 1,
                                    minWidth: 120,
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '10px',
                                    padding: '0 5px',
                                }}
                                error={errorTimeframe && timeframe === ''}>
                                <Select
                                    className="TimeframeSelect"
                                    labelId="demo-simple-select-standard-label"
                                    value={timeframe}
                                    onChange={handleTimeframeChange}
                                    displayEmpty>
                                    <MenuItem
                                        key="stockDataManager__timeframeAll"
                                        value="">
                                        All
                                    </MenuItem>
                                    {TIMEFRAMES.map(timeframe => (
                                        <MenuItem
                                            key={`stockDataManager__timeframe${timeframe.value}`}
                                            value={timeframe.value}>
                                            {timeframe.display}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            <AddCircleOutlineIcon
                                onClick={handleAddTicker}
                                className="StockdataManager__stockIcon"
                            />
                            <HighlightOffIcon
                                onClick={handleDeleteTicker}
                                className="StockdataManager__stockIcon delete"
                            />
                        </div>
                    </div>
                    <hr className="subDivider" />
                    {/* Stock data */}
                    <div className="StockdataManager__stockData">
                        {stockList.map(stock => (
                            <StockdataItems
                                key={`stockDataItems_${stock}_${timeframe}`}
                                stock={stock}
                                timeframe={timeframe}
                                handleCloseModal={handleCloseStockDataManager}
                            />
                        ))}
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default StockdataManager;
