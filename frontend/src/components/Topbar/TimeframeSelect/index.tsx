import React, { useState } from 'react';
import { useManager } from '../../../context/ManagerContext';
import { StockDataInfo } from '../../../types/data';
import './TimeframeSelect.scss';
import {
    Button,
    ClickAwayListener,
    Grow,
    Paper,
    Popper,
    MenuItem,
    MenuList,
} from '@mui/material/';

const TimeframeSelect: React.FC = () => {
    const { currentTicker, stockDataList, setCurrentTicker } = useManager();
    const [open, setOpen] = useState<boolean>(false);
    const [selectedIndex, setSelectedIndex] = useState<number>(1);
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const timeframeList =
        currentTicker && stockDataList
            ? stockDataList.reduce(
                  (acc: StockDataInfo[], stock: StockDataInfo) =>
                      stock.ticker === currentTicker.ticker
                          ? acc.concat(stock)
                          : acc,
                  [],
              )
            : [];

    const handleTimeframeChange = (index: number) => {
        setSelectedIndex(index);
        setOpen(false);
        const selectStock = timeframeList.find((_, idx) => index === idx);
        if (selectStock) {
            setCurrentTicker(selectStock);
        }
    };

    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }

        setOpen(false);
    };

    const handleToggle = () => {
        setOpen(prevOpen => !prevOpen);
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    return (
        <>
            <div className="CustomButton">
                <Button ref={anchorRef} onClick={handleToggle}>
                    {currentTicker ? currentTicker.timeframe : 'T'}
                </Button>
            </div>

            <Popper
                className="TimeframeSelect__popper"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom-start'
                                    ? 'left top'
                                    : 'left bottom',
                        }}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    onKeyDown={handleListKeyDown}>
                                    {timeframeList.map((stockData, index) => (
                                        <MenuItem
                                            selected={index === selectedIndex}
                                            onClick={() =>
                                                handleTimeframeChange(index)
                                            }>
                                            {stockData.timeframe}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
};

export default TimeframeSelect;
