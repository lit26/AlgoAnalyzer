export type StockDataInfo = {
    id: number;
    ticker: string;
    timeframe: string;
    startTime: string;
    endTime: string;
};

export type Timeframe = {
    display: string;
    value: string;
};

export type Strategy = {
    name: string;
    params?: StrategyParam[];
};

export type StrategyParam = {
    name: string;
    default: number | boolean | string;
    current: number | boolean | string;
};

export type Transaction = {
    date: string;
    action: string;
    size: number;
    price: number;
    pnl: number;
    pnlcomm: number;
    barlen: number;
    pnlpct: number;
};

export type Trade = {
    ref: number;
    trades: Transaction[];
};

export type Drawdown = {
    drawdown: number;
    moneydown: number;
    maxdrawdown: number;
    maxmoneydown: number;
};

export type StrategyStat = {
    totalreturn: number;
    buyhold: number;
    maxpnl: number;
    minpnl: number;
    winrate: number;
    sharpe: number;
    sqn: number;
    trades: number;
    rtot: number;
    ravg: number;
    rnorm: number;
    rnorm100: number;
};

export type Sizer = {
    type: 'fix' | 'percentage';
    amount: number;
};

export type Note = {
    id: number;
    title: string;
    content: string;
    relateStock: string;
    relateStrategy: string;
    createdAt?: string;
    updatedAt?: string;
};
