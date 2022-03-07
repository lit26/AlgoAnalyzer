import React from 'react';
import './StatRow.scss';

interface StatRowProps {
    label: string;
    pct: boolean;
    num?: any;
}

const isFloat = (n: any) => {
    if (typeof n === 'number') {
        return n % 1 !== 0;
    } else {
        return false;
    }
};

const StatRow: React.FC<StatRowProps> = ({ label, num, pct }) => {
    return (
        <div className="StatRow">
            <div>{label}</div>
            <div>
                {num ? (isFloat(num) ? num.toFixed(2) : num) : ''}
                {pct && '%'}
            </div>
        </div>
    );
};

export default StatRow;
