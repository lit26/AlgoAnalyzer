import React from 'react';
import Button from '@mui/material/Button';
import { useBacktest } from '../../../context/BacktestContext';
import ParamItem from './ParamItem';
import './ParamsInput.scss';

const ParamsInput: React.FC = () => {
    const { currentStrategy, setCurrentStrategy } = useBacktest();

    const resetParams = () => {
        if (currentStrategy.params) {
            setCurrentStrategy({
                name: currentStrategy.name,
                params: currentStrategy.params.map(param => ({
                    ...param,
                    current: param.default,
                })),
            });
        }
    };

    const handleParamChange = (
        name: string,
        value: number | boolean | string,
    ) => {
        if (currentStrategy.params) {
            setCurrentStrategy({
                name: currentStrategy.name,
                params: currentStrategy.params.map(param => {
                    if (param.name === name) {
                        return {
                            ...param,
                            current:
                                typeof param.default === 'number' &&
                                typeof value === 'string'
                                    ? parseFloat(value)
                                    : value,
                        };
                    } else {
                        return param;
                    }
                }),
            });
        }
    };

    const updateParams = () => {};

    return (
        <>
            {/* Params input */}
            <div className="ParamsInput__inputs">
                {currentStrategy.params &&
                    currentStrategy.params.map((param, index) => (
                        <ParamItem
                            key={`param_${index}`}
                            name={param.name}
                            defaultParam={param.default}
                            value={param.current}
                            onChange={handleParamChange}
                        />
                    ))}
            </div>

            <hr className="subDivider" />

            {/* Change buttons */}
            <div className="ParamsInput__buttons">
                <Button size="small" variant="outlined" onClick={resetParams}>
                    Default
                </Button>
                <Button size="small" variant="contained" onClick={updateParams}>
                    Ok
                </Button>
            </div>
        </>
    );
};

export default ParamsInput;
