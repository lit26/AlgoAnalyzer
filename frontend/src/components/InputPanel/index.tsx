import React from 'react';
import { useBacktest } from '../../context/BacktestContext';
import ParamsInput from './ParamsInput';
import './InputPanel.scss';

const InputPanel: React.FC = () => {
    const { currentStrategy } = useBacktest();

    return (
        <div className="InputPanel">
            <div className="InputPanel__header">
                <h3>Inputs</h3>
            </div>

            <hr className="subDivider" />
            {currentStrategy.name !== '' ? (
                <ParamsInput />
            ) : (
                <div className="InputPanel__placeholder">No strategy</div>
            )}
        </div>
    );
};

export default InputPanel;
