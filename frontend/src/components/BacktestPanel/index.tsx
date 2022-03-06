import React, { useState } from 'react';
import Transactions from './Transactions';
import Performance from './Performance';
import './BacktestPanel.scss';
import { useBacktest } from '../../context/BacktestContext';
import CircularProgress from '@mui/material/CircularProgress';

const backtestTabs = ['Transactions', 'Performance'];

const BacktestPanel: React.FC = () => {
    const [curBacktestTab, setCurBacktestTab] = useState<string>(
        backtestTabs[0],
    );
    const { trades, backtestRunning } = useBacktest();

    return (
        <div className="BacktestPanel">
            <div className="BacktestPanel__header">
                {backtestTabs.map((backtestTab, index) => (
                    <div
                        key={`backtestTab__${index}`}
                        className={`BacktestPanel__nav ${
                            curBacktestTab === backtestTab ? 'active' : ''
                        }`}
                        onClick={() => setCurBacktestTab(backtestTab)}>
                        {backtestTab}
                    </div>
                ))}
            </div>
            <div className="BacktestPanel__content">
                {trades && !backtestRunning ? (
                    <>
                        {curBacktestTab === 'Transactions' && <Transactions />}
                        {curBacktestTab === 'Performance' && <Performance />}
                    </>
                ) : (
                    <div className="placeholder">
                        {backtestRunning ? (
                            <div className="BacktestPanel__running">
                                <CircularProgress
                                    style={{
                                        width: '26px',
                                        height: '26px',
                                        marginRight: '5px',
                                    }}
                                />
                                <div>Backtest running.</div>
                            </div>
                        ) : (
                            <div>No backtest Strategy running.</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BacktestPanel;
