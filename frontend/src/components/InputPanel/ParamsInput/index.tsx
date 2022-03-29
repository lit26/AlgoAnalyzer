import Button from '@mui/material/Button';
import React from 'react';

import { useBacktest } from '../../../context/BacktestContext';
import { useManager } from '../../../context/ManagerContext';
import { useToast } from '../../../context/ToastContext';
import ParamItem from './ParamItem';
import './ParamsInput.scss';

const ParamsInput: React.FC = () => {
    const { currentStrategy, setCurrentStrategy, currentTicker, chartType } =
        useManager();
    const { addToast } = useToast();
    const { setBacktestRunning, runStrategy } = useBacktest();

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
                        if (value) {
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
                    } else {
                        return param;
                    }
                }),
            });
        }
    };

    const updateParams = () => {
        setBacktestRunning(true);

        runStrategy(
            currentStrategy.name,
            chartType,
            currentTicker,
            currentStrategy.params,
        ).catch(err => {
            addToast(err.msg, 'error');
        });
    };

    return (
        <>
            {/* Params input */}
            <div className="ParamsInput__inputs flex-grow-1 overflow-y-auto">
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
            <div className="ParamsInput__buttons flex justify-between items-center">
                <Button size="small" variant="outlined" onClick={resetParams}>
                    Default
                </Button>
                <Button size="small" variant="contained" onClick={updateParams}>
                    Backtest
                </Button>
            </div>
        </>
    );
};

export default ParamsInput;
