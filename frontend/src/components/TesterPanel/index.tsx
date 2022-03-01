import React, { useState } from 'react';
import './TesterPanel.scss';
import CustomButton from '../CustomButton';
import SettingsIcon from '@mui/icons-material/Settings';
import BacktestPanel from '../BacktestPanel';
import OptimizePanel from '../OptimizePanel';
import SettingsModal from './SettingsModal';

const TesterPanel: React.FC = () => {
    const [curTab, setCurTab] = useState<string>('backtest');
    const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

    const handleChange = (tab: string) => {
        setCurTab(tab);
    };

    const handleSettingsClose = () => {
        setSettingsOpen(false);
    };

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
                    onClick={() => setSettingsOpen(true)}
                    style={{ padding: '0 6px', cursor: 'pointer' }}
                />
                <SettingsModal
                    open={settingsOpen}
                    handleClose={handleSettingsClose}
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
