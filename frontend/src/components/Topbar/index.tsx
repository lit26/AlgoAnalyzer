import React from 'react';
import StockdataManager from './StockdataManager';
import TimeframeSelect from './TimeframeSelect';
import StrategyManager from './StrategyManager';
import './Topbar.scss';

const Topbar: React.FC = () => {
    return (
        <div className="Topbar">
            <StockdataManager />
            <TimeframeSelect />
            <StrategyManager />
        </div>
    );
};

export default Topbar;
