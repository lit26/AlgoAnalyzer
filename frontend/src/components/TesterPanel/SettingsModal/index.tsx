import React from 'react';
import { Modal, Backdrop } from '@mui/material/';

interface SettingsModalProps {
    open: boolean;
    handleClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ open, handleClose }) => {
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
            <div className="AlgoModal">
                <h1>Trade settings</h1>
                <hr />
            </div>
        </Modal>
    );
};

export default SettingsModal;
