import React from 'react';

import './StrategyManagerItem.scss';

interface StrategyManagerItemProps {
    strategy: string;
    selectStrategy: (strategy: string) => void;
}

const StrategyManagerItem: React.FC<StrategyManagerItemProps> = ({
    strategy,
    selectStrategy,
}) => {
    return (
        <div
            className="StrategyManagerItem"
            onClick={() => selectStrategy(strategy)}>
            {strategy}
        </div>
    );
};

export default StrategyManagerItem;
