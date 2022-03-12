import React, { useState } from 'react';
import './TopbarSelect.scss';

import {
    Button,
    ClickAwayListener,
    Grow,
    Paper,
    Popper,
    MenuItem,
    MenuList,
} from '@mui/material/';

interface TopbarSelect {
    name: string;
    selectedIndex: number;
    handleChange: (index: number) => void;
    menuList: string[];
}

const TopbarSelect: React.FC<TopbarSelect> = ({
    name,
    selectedIndex,
    handleChange,
    menuList,
}) => {
    const [open, setOpen] = useState<boolean>(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);
    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }

        setOpen(false);
    };

    const handleSelectChange = (index: number) => {
        handleChange(index);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen(prevOpen => !prevOpen);
    };

    const handleListKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    };
    return (
        <>
            <div className="CustomButton">
                <Button ref={anchorRef} onClick={handleToggle}>
                    {menuList[selectedIndex]}
                </Button>
            </div>
            <Popper
                className="TopbarSelect__popper"
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
                                    {menuList.map((menuItem, index) => (
                                        <MenuItem
                                            key={`topbar_${name}_${index}`}
                                            selected={index === selectedIndex}
                                            onClick={() =>
                                                handleSelectChange(index)
                                            }>
                                            {menuItem}
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

export default TopbarSelect;
