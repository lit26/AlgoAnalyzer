interface Column {
    id: string;
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

export const columns: readonly Column[] = [
    { id: 'id', label: '#' },
    { id: 'date', label: 'Date' },
    {
        id: 'type',
        label: 'Type',
        minWidth: 30,
    },
    {
        id: 'price',
        label: 'Price',
        // minWidth: 50,
        align: 'right',
    },
    {
        id: 'size',
        label: 'Size',
        // minWidth: 80,
        align: 'right',
    },
    // {
    //     id: 'barlen',
    //     label: 'Bar length',
    //     align: 'right',
    // },
    {
        id: 'pnl',
        label: 'PnL',
        align: 'right',
    },
];
