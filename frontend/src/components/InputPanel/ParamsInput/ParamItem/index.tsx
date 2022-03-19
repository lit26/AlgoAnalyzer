import { InputBase } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import React from 'react';

import './ParamItem.scss';

interface ParamItemProps {
    name: string;
    defaultParam: number | boolean | string;
    value: number | boolean | string;
    onChange: (name: string, value: number | boolean | string) => void;
}

const ParamItem: React.FC<ParamItemProps> = ({
    name,
    defaultParam,
    value,
    onChange,
}) => {
    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(name, e.target.checked);
    };

    const handleTextChange = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    ) => {
        onChange(name, e.target.value);
    };

    return (
        <div className="ParamItem">
            <div>{name}</div>
            <div className="ParamItem__input">
                {typeof value === 'boolean' && (
                    <Checkbox checked={value} onChange={handleNumberChange} />
                )}
                {(typeof value === 'number' || typeof value === 'string') && (
                    <InputBase
                        type={
                            typeof defaultParam === 'number' ? 'number' : 'text'
                        }
                        value={value ? value : 0}
                        onChange={handleTextChange}
                    />
                )}
            </div>
        </div>
    );
};

export default ParamItem;
