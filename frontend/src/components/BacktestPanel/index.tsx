import CircularProgress from '@mui/material/CircularProgress';
import React, { useState } from 'react';

import { useBacktest } from '../../context/BacktestContext';
import './BacktestPanel.scss';
import Performance from './Performance';
import Transactions from './Transactions';

const backtestTabs = ['Transactions', 'Performance'];

const BacktestPanel: React.FC = () => {
    const [curBacktestTab, setCurBacktestTab] = useState<string>(
        backtestTabs[0],
    );
    const { backtestRes, backtestRunning } = useBacktest();

    return (
        <div className="BacktestPanel flex flex-col flex-1">
            <div className="BacktestPanel__header flex justify-end items-center">
                {backtestTabs.map((backtestTab, index) => (
                    <div
                        key={`backtestTab__${index}`}
                        className={`BacktestPanel__nav cursor-pointer ${
                            curBacktestTab === backtestTab ? 'active' : ''
                        }`}
                        onClick={() => setCurBacktestTab(backtestTab)}>
                        {backtestTab}
                    </div>
                ))}
            </div>
            <div className="BacktestPanel__content flex flex-col flex-1">
                {backtestRes && !backtestRunning ? (
                    <>
                        {curBacktestTab === 'Transactions' && <Transactions />}
                        {curBacktestTab === 'Performance' && <Performance />}
                    </>
                ) : (
                    <div className="placeholder">
                        {backtestRunning ? (
                            <div className="BacktestPanel__running flex items-center">
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
                            <div>No backtest strategy running.</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BacktestPanel;
