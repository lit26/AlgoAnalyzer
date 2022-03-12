import React from 'react';
import './StatRow.scss';

interface StatRowProps {
    label: string;
    pct: boolean;
    num?: number;
}

const isFloat = (n: number) => (typeof n === 'number' ? n % 1 !== 0 : false);

const StatRow: React.FC<StatRowProps> = ({ label, num, pct }) => {
    return (
        <div className="StatRow">
            <div>{label}</div>
            <div>
                {num ? (isFloat(num) ? num.toFixed(2) : num) : '0'}
                {pct && '%'}
            </div>
        </div>
    );
};

export default StatRow;
