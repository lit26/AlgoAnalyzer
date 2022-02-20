import React from 'react';
import StockdataManager from './StockdataManager';
import TimeframeSelect from './TimeframeSelect';
import './Topbar.scss';

const Topbar: React.FC = () => {
    return (
        <div className="Topbar">
            <StockdataManager />
            <TimeframeSelect />
        </div>
    );
};

export default Topbar;
