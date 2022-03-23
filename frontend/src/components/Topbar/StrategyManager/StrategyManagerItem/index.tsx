import CloseIcon from '@mui/icons-material/Close';
import React from 'react';

import { Strategy } from '../../../../types/data';
import './StrategyManagerItem.scss';

interface StrategyManagerItemProps {
    strategy: Strategy;
    selectStrategy: (strategy: Strategy) => void;
    handleDelete?: (strategyId?: number) => void;
}

const StrategyManagerItem: React.FC<StrategyManagerItemProps> = ({
    strategy,
    selectStrategy,
    handleDelete,
}) => {
    const saved = strategy.id ? true : false;

    return (
        <div className="StrategyManagerItem">
            <div
                className="StrategyManagerItem__content"
                onClick={() => selectStrategy(strategy)}>
                <div>{strategy.display ? strategy.display : strategy.name}</div>
                {saved && <div>{strategy.timeframe}</div>}
            </div>
            {saved && handleDelete && (
                <div onClick={() => handleDelete(strategy.id)}>
                    <CloseIcon />
                </div>
            )}
        </div>
    );
};

export default StrategyManagerItem;
