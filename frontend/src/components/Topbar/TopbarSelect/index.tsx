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
    SvgIconTypeMap,
} from '@mui/material/';
import { OverridableComponent } from '@mui/material/OverridableComponent';

interface TopbarSelect {
    name: string;
    selectedIndex: number;
    handleChange: (index: number) => void;
    menuList: {
        name: string;
        // eslint-disable-next-line @typescript-eslint/ban-types
        Icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
            muiName: string;
        };
    }[];
}

const TopbarSelect: React.FC<TopbarSelect> = ({
    name,
    selectedIndex,
    handleChange,
    menuList,
}) => {
    const [open, setOpen] = useState<boolean>(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);
    const handleClose = (e: Event | React.SyntheticEvent) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(e.target as HTMLElement)
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

    const handleListKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            setOpen(false);
        } else if (e.key === 'Escape') {
            setOpen(false);
        }
    };

    const SelectIcon = menuList[selectedIndex] && menuList[selectedIndex].Icon;

    return (
        <>
            <div className="CustomButton">
                <Button ref={anchorRef} onClick={handleToggle}>
                    {SelectIcon ? (
                        <SelectIcon />
                    ) : menuList[selectedIndex] ? (
                        menuList[selectedIndex].name
                    ) : (
                        ''
                    )}
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
                                    {menuList.map((menuItem, index) => {
                                        const Icon = menuItem.Icon;
                                        return (
                                            <MenuItem
                                                key={`topbar_${name}_${index}`}
                                                selected={
                                                    index === selectedIndex
                                                }
                                                onClick={() =>
                                                    handleSelectChange(index)
                                                }>
                                                {Icon && (
                                                    <Icon
                                                        style={{
                                                            marginRight: '8px',
                                                        }}
                                                    />
                                                )}
                                                {menuItem.name}
                                            </MenuItem>
                                        );
                                    })}
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
