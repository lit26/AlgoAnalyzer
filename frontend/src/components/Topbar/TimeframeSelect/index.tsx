import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CustomButton from '../../CustomButton';
import { useBacktest } from '../../../context/BacktestContext';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const TimeframeSelect: React.FC = () => {
    const { currentTicker } = useBacktest();
    const [open, setOpen] = useState<boolean>(false);
    return (
        <>
            <CustomButton
                onClick={() => setOpen(!open)}
                text={currentTicker ? currentTicker.timeframe : 'T'}
            />
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <div>test</div>
                    {/* <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor
                        ligula.
                    </Typography> */}
                </Box>
            </Modal>
        </>
    );
};

export default TimeframeSelect;
