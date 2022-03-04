import React from 'react';
import { useManager } from '../../context/ManagerContext';
import ParamsInput from './ParamsInput';
import './InputPanel.scss';

const InputPanel: React.FC = () => {
    const { currentStrategy } = useManager();

    return (
        <div className="InputPanel">
            <div className="InputPanel__header">
                <h3>Inputs</h3>
            </div>

            <hr className="subDivider" />
            {currentStrategy.name !== '' ? (
                <ParamsInput />
            ) : (
                <div className="placeholder">No strategy</div>
            )}
        </div>
    );
};

export default InputPanel;
