import React from 'react';

import ChartSelect from './ChartSelect';
import StockdataManager from './StockdataManager';
import StrategyManager from './StrategyManager';
import TimeframeSelect from './TimeframeSelect';
import './Topbar.scss';

const Topbar: React.FC = () => {
    return (
        <div className="Topbar flex">
            <StockdataManager />
            <TimeframeSelect />
            <StrategyManager />
            <ChartSelect />
        </div>
    );
};

export default Topbar;
