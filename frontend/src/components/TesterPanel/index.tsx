import React, { useState } from 'react';
import './TesterPanel.scss';
import CustomButton from '../CustomButton';
import SettingsIcon from '@mui/icons-material/Settings';
import BacktestPanel from '../BacktestPanel';
import OptimizePanel from '../OptimizePanel';

const TesterPanel: React.FC = () => {
    const [curTab, setCurTab] = useState<string>('backtest');

    const handleChange = (tab: string) => {
        setCurTab(tab);
    };

    const handleSettingsChange = () => {};

    return (
        <div className="TesterPanel">
            <div className="TesterPanel__header">
                <CustomButton
                    text="Backtest"
                    onClick={() => handleChange('backtest')}
                />
                <CustomButton
                    text="Optimize"
                    onClick={() => handleChange('optimize')}
                />
                <SettingsIcon
                    onClick={handleSettingsChange}
                    style={{ padding: '0 6px' }}
                />
            </div>
            <hr className="subDivider" />
            <div className="TesterPanel__content">
                {curTab === 'backtest' && <BacktestPanel />}
                {curTab === 'optimize' && <OptimizePanel />}
            </div>
        </div>
    );
};

export default TesterPanel;
