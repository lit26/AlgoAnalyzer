export interface Row {
    key: string;
    label: string;
    pct: boolean;
    value?: any;
}

export const statRowsLabels: Row[] = [
    { key: 'trades', label: '# Trades', pct: false },
    { key: 'winrate', label: 'Win rate', pct: true },
    { key: 'totalreturn', label: 'Return', pct: true },
    { key: 'buyhold', label: 'Buy hold', pct: true },
    { key: 'maxpnl', label: 'Max pnl', pct: true },
    { key: 'minpnl', label: 'Min pnl', pct: true },
    { key: 'sharpe', label: 'Sharpe', pct: false },
    { key: 'sqn', label: 'SQN', pct: false },
    { key: 'rtot', label: 'Compound Return', pct: true },
    { key: 'ravg', label: 'Avg Return', pct: true },
    { key: 'rnorm100', label: 'Annualized return', pct: true },
];

export const drawdownLabels: Row[] = [
    { key: 'drawdown', label: 'Drawdown', pct: true },
    { key: 'moneydown', label: 'Money down', pct: false },
    { key: 'maxdrawdown', label: 'Max drawdown', pct: true },
    { key: 'maxmoneydown', label: 'Max money down', pct: false },
];
