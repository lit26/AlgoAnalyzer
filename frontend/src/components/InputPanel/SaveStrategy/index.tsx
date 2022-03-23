import { Backdrop, Button, InputBase, Modal } from '@mui/material/';
import React, { useState } from 'react';

import { useManager } from '../../../context/ManagerContext';
import './SaveStrategy.scss';

const SaveStrategy: React.FC = () => {
    const [saveStrategyName, setSaveStrategyName] = useState<string>('');
    const [saveModalOpen, setSaveModalOpen] = useState<boolean>(true);
    const { currentStrategy } = useManager();

    const handleSaveStrategyName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSaveStrategyName(e.target.value);
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
                <div className="AlgoModal SaveStrategy">
                    <h1>Save strategy</h1>
                    <hr />
                    <div className="SaveStrategy__info">
                        {/* Display name */}
                        <div className="SaveStrategy__Row">
                            <div className="SaveStrategy__label">Name</div>
                            <div className="SaveStrategy__input">
                                <InputBase
                                    type="text"
                                    value={saveStrategyName}
                                    onChange={handleSaveStrategyName}
                                />
                            </div>
                        </div>
                        {/* Display name */}
                        <div className="SaveStrategy__Row">
                            <div className="SaveStrategy__label">Strategy</div>
                            <div className="SaveStrategy__input">
                                <InputBase
                                    type="text"
                                    value={currentStrategy.name}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="Settings__action">
                        <Button
                            size="small"
                            variant="outlined"
                            // onClick={cancelUpdate}
                        >
                            Update
                        </Button>
                        <Button
                            size="small"
                            variant="contained"
                            // onClick={handleUpdate}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default SaveStrategy;
