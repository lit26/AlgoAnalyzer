import React, { useState, useEffect } from 'react';
import {
    Modal,
    Backdrop,
    InputBase,
    Button,
    MenuItem,
    FormControl,
} from '@mui/material/';
import './SettingsModal.scss';
import { useManager } from '../../../context/ManagerContext';
import { useBacktest } from '../../../context/BacktestContext';
import { useNotification } from '../../../context/NotificationContext';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Sizer } from '../../../types/data';

interface SettingsModalProps {
    open: boolean;
    handleClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ open, handleClose }) => {
    const [curCash, setCurCash] = useState<number>(0);
    const [curSizer, setCurSizer] = useState<Sizer>({
        type: 'percentage',
        amount: 0,
    });

    const { addNotifications } = useNotification();
    const { currentStrategy, currentTicker, chartType } = useManager();
    const {
        defaultCash,
        setDefaultCash,
        defaultSizer,
        setDefaultSizer,
        runStrategy,
        setBacktestRunning,
    } = useBacktest();

    useEffect(() => {
        setCurCash(defaultCash);
        setCurSizer(defaultSizer);
    }, [defaultCash, defaultSizer]);

    const handleCashChange = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    ) => {
        setCurCash(parseFloat(e.target.value));
    };

    const handleSizerChange = (e: SelectChangeEvent) => {
        const inputSizer = e.target.value;
        if (inputSizer === 'fix' || inputSizer === 'percentage') {
            setCurSizer({
                ...curSizer,
                type: inputSizer,
            });
        }
    };

    const handleSizerAmountChange = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    ) => {
        setCurSizer({
            ...curSizer,
            amount: parseFloat(e.target.value),
        });
    };

    const handleUpdate = () => {
        setDefaultSizer(curSizer);
        setDefaultCash(curCash);
        handleClose();

        if (currentStrategy.name !== '') {
            setBacktestRunning(true);
            runStrategy(
                currentStrategy.name,
                chartType,
                currentTicker,
                currentStrategy.params,
                curCash,
                curSizer,
            ).catch(err => {
                addNotifications(err.msg, 'error');
            });
        }
    };

    const cancelUpdate = () => {
        setCurSizer(defaultSizer);
        setCurCash(defaultCash);
        handleClose();
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}>
            <div className="AlgoModal Settings">
                <h1>Trade settings</h1>
                <hr />
                <div className="Settings__settings">
                    {/* initial cash */}
                    <div className="SettingsRow">
                        <div className="SettingsRow__label">Initial cash</div>
                        <div className="SettingsRow__sizer">
                            <InputBase
                                type="number"
                                value={curCash}
                                onChange={handleCashChange}
                            />
                        </div>
                    </div>
                    {/* sizer */}
                    <div className="SettingsRow">
                        <div className="SettingsRow__label">Sizer</div>
                        <div className="SettingsRow__sizer">
                            <InputBase
                                type="number"
                                value={curSizer.amount}
                                onChange={handleSizerAmountChange}
                            />
                            <FormControl
                                variant="standard"
                                sx={{
                                    s: 1,
                                    minWidth: 120,
                                    border: '1px solid rgba(255, 255, 255)',
                                    borderRadius: '4px',
                                    padding: '0 5px',
                                }}>
                                <Select
                                    className="SettingsRow__sizerSelect"
                                    labelId="demo-simple-select-standard-label"
                                    value={curSizer.type}
                                    onChange={handleSizerChange}
                                    displayEmpty>
                                    <MenuItem value="percentage">
                                        Percentage sizer
                                    </MenuItem>
                                    <MenuItem value="fix">Fix sizer</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                </div>
                <div className="Settings__action">
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={cancelUpdate}>
                        Cancel
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        onClick={handleUpdate}>
                        Update
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default SettingsModal;
