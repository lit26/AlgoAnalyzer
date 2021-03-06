import React from 'react';

import { useManager } from '../../context/ManagerContext';
import './InputPanel.scss';
import ParamsInput from './ParamsInput';
import SaveStrategy from './SaveStrategy';

const InputPanel: React.FC = () => {
    const { currentStrategy } = useManager();

    return (
        <div className="InputPanel flex flex-col">
            <div className="InputPanel__header flex justify-between items-center">
                <h3>Inputs</h3>
                {currentStrategy.name !== '' && <SaveStrategy />}
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
