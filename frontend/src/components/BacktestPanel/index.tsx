import React, { useState } from 'react';
import Transactions from './Transactions';
import Performance from './Performance';
import './BacktestPanel.scss';

const backtestTabs = ['Transactions', 'Performance'];

const BacktestPanel: React.FC = () => {
    const [curBacktestTab, setCurBacktestTab] = useState<string>(
        backtestTabs[0],
    );

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
                {curBacktestTab === 'Transactions' && <Transactions />}
                {curBacktestTab === 'Performance' && <Performance />}
            </div>
        </div>
    );
};

export default BacktestPanel;
