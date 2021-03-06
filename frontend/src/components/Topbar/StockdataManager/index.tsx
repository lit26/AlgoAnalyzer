import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { TreeItem, TreeView } from '@mui/lab';
import { Backdrop, FormControl, MenuItem, Modal } from '@mui/material/';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, { useEffect, useState } from 'react';

import { updateStockDataRequest } from '../../../apis/stockData';
import { TIMEFRAMES } from '../../../constants';
import { useManager } from '../../../context/ManagerContext';
import { useToast } from '../../../context/ToastContext';
import CustomButton from '../../CustomButton';
import Searchbar from '../../Searchbar';
import StockdataItems from './StockdataItems';
import './StockdataManager.scss';

const StockdataManager: React.FC = () => {
    const [stockList, setStockList] = useState<string[]>([]);
    const [timeframe, setTimeframe] = useState<string>('');
    const [stockDataManagerModalOpen, setStockDataManagerModalOpen] =
        useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const { currentTicker, stockDataList, addStockData } = useManager();
    const { addToast } = useToast();

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
            addToast('Please add a stock and timeframe.', 'error');
            return false;
        } else if (search === '') {
            addToast('Please add a stock.', 'error');
            return false;
        } else if (validateFull && timeframe === '') {
            addToast('Please select a timeframe.', 'error');
            return false;
        } else {
            return true;
        }
    };

    const handleAddTicker = () => {
        if (validateInput(true)) {
            updateStockDataRequest(search, timeframe)
                .then(res => addStockData(res))
                .catch(() => addToast('Fail to add stock data.', 'error'));
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
                    <div className="StockdataManager__input flex justify-between items-center">
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
                                className="StockdataManager__stockIcon cursor-pointer"
                            />
                            <HighlightOffIcon
                                onClick={() => setSearch('')}
                                className="StockdataManager__stockIcon delete"
                            />
                        </div>
                    </div>
                    <hr className="subDivider" />
                    {/* Stock data */}
                    <div className="StockdataManager__stockData overflow-y-auto">
                        <TreeView
                            aria-label="file system navigator"
                            defaultCollapseIcon={<ExpandMoreIcon />}
                            defaultExpandIcon={<ChevronRightIcon />}
                            sx={{
                                flexGrow: 1,
                                overflowY: 'auto',
                                overflowX: 'hidden',
                            }}>
                            {stockList.map(stock => (
                                <TreeItem
                                    key={`stock_${stock}`}
                                    nodeId={`stock_${stock}`}
                                    sx={{
                                        padding: '0.25rem',
                                    }}
                                    label={stock}>
                                    <StockdataItems
                                        stock={stock}
                                        timeframe={timeframe}
                                        handleCloseModal={
                                            handleCloseStockDataManager
                                        }
                                    />
                                </TreeItem>
                            ))}
                        </TreeView>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default StockdataManager;
