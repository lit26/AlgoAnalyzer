import React, { useState, useEffect } from 'react';
import CustomButton from '../../CustomButton';
import Searchbar from '../../Searchbar';
import './StockdataManager.scss';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useBacktest } from '../../../context/BacktestContext';
import { useNotification } from '../../../context/NotificationContext';
import StockdataItems from './StockdataItems';
import { TIMEFRAMES } from '../../../constants';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {
    updateStockDataRequest,
    deleteStockDataRequest,
} from '../../../apis/stockData';

const StockdataManager: React.FC = () => {
    const [stockList, setStockList] = useState<string[]>([]);
    const [timeframe, setTimeframe] = useState<string>('');
    const [stockExpand, setStockExpand] = useState<string | false>('panel1');
    const [stockDataManagerModalOpen, setStockDataManagerModalOpen] =
        useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const { currentTicker, stockDataList, addStockData, deleteStockData } =
        useBacktest();
    const { addNotifications } = useNotification();

    const handlePanelChange =
        (panel: string) =>
        (event: React.SyntheticEvent, newExpanded: boolean) => {
            setStockExpand(newExpanded ? panel : false);
        };

    useEffect(() => {
        if (!stockDataManagerModalOpen) {
            setSearch('');
        }
    }, [stockDataManagerModalOpen]);

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

    const validateInput = (validateFull: boolean) => {
        if (search === '' && timeframe === '') {
            addNotifications('Please add a stock and timeframe.', 'error');
            return false;
        } else if (search === '') {
            addNotifications('Please add a stock.', 'error');
            return false;
        } else if (validateFull && timeframe === '') {
            addNotifications('Please select a timeframe.', 'error');
            return false;
        } else {
            return true;
        }
    };

    const handleAddTicker = () => {
        if (validateInput(true)) {
            updateStockDataRequest(search, timeframe)
                .then(res => addStockData(res))
                .catch(() =>
                    addNotifications('Fail to add stock data.', 'error'),
                );
        }
    };

    const handleDeleteTicker = async () => {
        if (validateInput(true)) {
            const deleteStock = stockDataList.find(
                stock =>
                    stock.ticker === search && stock.timeframe === timeframe,
            );
            if (deleteStock) {
                deleteStockDataRequest(search, timeframe)
                    .then(res => deleteStockData(deleteStock.id))
                    .catch(err =>
                        addNotifications('Fail to delete stock data.', 'error'),
                    );
            } else {
                addNotifications(`${search} is not exist.`, 'error');
            }
        }
    };

    const handleCloseStockDataManager = () => {
        setStockDataManagerModalOpen(false);
    };

    const handleSearchChange = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    ) => {
        setSearch(e.target.value.toUpperCase());
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
                <div className="AlgoModal">
                    <h1>Stock data</h1>
                    <hr />
                    {/* Search bar */}
                    <div className="StockdataManager__input">
                        <Searchbar
                            search={search}
                            onChange={handleSearchChange}
                            placeholder="Type to search or add"
                        />
                        <div>
                            <FormControl
                                variant="standard"
                                sx={{
                                    s: 1,
                                    minWidth: 120,
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '10px',
                                    padding: '0 5px',
                                }}>
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
                                expand={stockExpand}
                                handlePanelChange={handlePanelChange}
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
