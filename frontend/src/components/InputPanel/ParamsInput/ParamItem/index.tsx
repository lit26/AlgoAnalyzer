import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import './ParamItem.scss';
import { InputBase } from '@mui/material';

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
    const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(name, event.target.checked);
    };

    const handleTextChange = (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    ) => {
        onChange(name, event.target.value);
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
                        value={value}
                        onChange={handleTextChange}
                    />
                )}
            </div>
        </div>
    );
};

export default ParamItem;
