import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import React from 'react';

import { useBacktest } from '../../context/BacktestContext';
import { Drawdown, StrategyStat } from '../../types/data';
import './ResultPanel.scss';
import { Row, drawdownLabels, statRowsLabels } from './Row';
import StatRow from './StatRow';

const ResultPanel: React.FC = () => {
    const { backtestRes } = useBacktest();

    const parseLabels = (items: StrategyStat | Drawdown, labels: Row[]) => {
        const dictList = Object.entries(items).map(([key, value]) => ({
            key,
            value,
        }));
        return labels.reduce((acc: Row[], row: Row) => {
            const findValue = dictList.find(value => value.key === row.key);
            if (findValue) {
                return acc.concat({
                    ...row,
                    value: findValue.value,
                });
            }
            return acc;
        }, []);
    };

    const statList = backtestRes
        ? parseLabels(backtestRes.stat, statRowsLabels)
        : [];

    const drawdownList = backtestRes
        ? parseLabels(backtestRes.drawdown, drawdownLabels)
        : [];

    return (
        <div className="ResultPanel overflow-y-auto">
            {backtestRes && (
                <>
                    {/* basic info */}
                    <h3>{backtestRes.strategy}</h3>
                    {/* stat */}
                    <div className="ResultPanel__row flex items-center">
                        <div>{backtestRes.ticker}</div>
                        <FiberManualRecordIcon style={{ fontSize: '0.5rem' }} />
                        <div>{backtestRes.timeframe}</div>
                    </div>
                    <div>
                        {statList.map(statLabel => (
                            <StatRow
                                key={statLabel.key}
                                label={statLabel.label}
                                pct={statLabel.pct}
                                num={statLabel.value}
                            />
                        ))}
                    </div>

                    {/* drawdown */}
                    <div>
                        {drawdownList.map(drawdownLabel => (
                            <StatRow
                                key={drawdownLabel.key}
                                label={drawdownLabel.label}
                                pct={drawdownLabel.pct}
                                num={drawdownLabel.value}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default ResultPanel;
