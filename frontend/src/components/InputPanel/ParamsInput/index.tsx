import React from 'react';
import { useBacktest } from '../../../context/BacktestContext';
import ParamItem from './ParamItem';
import './ParamsInput.scss';

const ParamsInput: React.FC = () => {
    const { currentStrategy } = useBacktest();
    console.log(currentStrategy);
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
                        />
                    ))}
            </div>

            <hr className="subDivider" />

            {/* Change buttons */}
            <div className="ParamsInput__buttons">buttons</div>
        </>
    );
};

export default ParamsInput;
