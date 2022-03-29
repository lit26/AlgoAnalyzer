import { Backdrop, Button, InputBase, Modal } from '@mui/material/';
import React, { useEffect, useState } from 'react';

import {
    saveSavedStrategyParams,
    updateSavedStrategyParams,
} from '../../../apis/strategy';
import { useManager } from '../../../context/ManagerContext';
import { useToast } from '../../../context/ToastContext';
import './SaveStrategy.scss';

const SaveStrategy: React.FC = () => {
    const [saveStrategyName, setSaveStrategyName] = useState<string>('');
    const [saveStrategyTimeframe, setSaveStrategyTimeframe] =
        useState<string>('');
    const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
    const {
        currentStrategy,
        currentTicker,
        addSavedStrategy,
        updateSavedStrategy,
    } = useManager();
    const { addToast } = useToast();

    useEffect(() => {
        setSaveStrategyName(
            currentStrategy.display ? currentStrategy.display : '',
        );
    }, [currentStrategy.display]);

    useEffect(() => {
        setSaveStrategyTimeframe(currentTicker ? currentTicker.timeframe : '');
    }, [currentTicker]);

    const handleSaveStrategyName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSaveStrategyName(e.target.value);
    };

    const handleSaveStrategyTimeframe = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setSaveStrategyTimeframe(e.target.value);
    };

    const handleSaveStrategy = () => {
        saveSavedStrategyParams(
            {
                ...currentStrategy,
                display: saveStrategyName,
            },
            saveStrategyTimeframe,
        )
            .then(res => {
                addSavedStrategy(res);
                setSaveModalOpen(false);
                addToast('Strategy is saved.', 'success');
            })
            .catch(() => addToast('Fail to save strategy.', 'error'));
    };

    const handleUpdateStrategy = () => {
        updateSavedStrategyParams(
            {
                ...currentStrategy,
                display: saveStrategyName,
            },
            saveStrategyTimeframe,
        )
            .then(res => {
                updateSavedStrategy(res);
                setSaveModalOpen(false);
                addToast('Strategy is updated.', 'success');
            })
            .catch(err => console.log(err));
    };

    return (
        <>
            <Button
                size="small"
                variant="contained"
                onClick={() => setSaveModalOpen(true)}>
                Save
            </Button>
            <Modal
                open={saveModalOpen}
                onClose={() => setSaveModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}>
                <div className="AlgoModal SaveStrategy flex flex-col">
                    <h1>Save strategy</h1>
                    <hr />
                    <div className="SaveStrategy__info flex-grow-1 overflow-y-auto">
                        {/* Display name */}
                        <div className="SaveStrategy__Row flex flex-wrap">
                            <div className="SaveStrategy__label flex-30p">
                                Name
                            </div>
                            <div className="SaveStrategy__input flex flex-70p items-center flex-wrap">
                                <InputBase
                                    type="text"
                                    value={saveStrategyName}
                                    onChange={handleSaveStrategyName}
                                />
                            </div>
                        </div>
                        {/* Timeframe */}
                        <div className="SaveStrategy__Row flex flex-wrap">
                            <div className="SaveStrategy__label flex-30p">
                                Timeframe
                            </div>
                            <div className="SaveStrategy__input flex flex-70p items-center flex-wrap">
                                <InputBase
                                    type="text"
                                    value={saveStrategyTimeframe}
                                    onChange={handleSaveStrategyTimeframe}
                                />
                            </div>
                        </div>
                        {/* Strategy */}
                        <div className="SaveStrategy__Row flex">
                            <div className="SaveStrategy__label">Strategy</div>
                            <div className="SaveStrategy__input flex items-center">
                                <InputBase
                                    type="text"
                                    value={currentStrategy.name}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="Settings__action flex justify-end">
                        {currentStrategy.id && (
                            <Button
                                size="small"
                                variant="outlined"
                                onClick={handleUpdateStrategy}>
                                Update
                            </Button>
                        )}
                        <Button
                            size="small"
                            variant="contained"
                            onClick={handleSaveStrategy}>
                            Save
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default SaveStrategy;
