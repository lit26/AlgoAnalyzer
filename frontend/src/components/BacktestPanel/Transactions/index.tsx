import React from 'react';
import { useBacktest } from '../../../context/BacktestContext';
import { useSettings } from '../../../context/SettingsContext';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Transaction } from '../../../types/data';

interface Column {
    id: string;
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
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
    {
        id: 'drawdown',
        label: 'Drawdown',
        align: 'right',
    },
];

const cellStyle = {
    backgroundColor: '#131722',
    color: '#d1d4dc',
    borderBottom: '1px solid #9ba4ad',
};

const calculatePnLPct = (transactions: Transaction[]) => {
    if (transactions.length === 2) {
        const from = transactions[0].price;
        const to = transactions[1].price;
        const pct = ((to - from) * 100) / from;
        return pct.toFixed(2);
    } else {
        return '';
    }
};

const Transactions: React.FC = () => {
    const { chartHeight } = useSettings();
    const { trades } = useBacktest();

    return (
        <Paper
            sx={{
                ...cellStyle,
                width: '100%',
                overflow: 'hidden',
            }}>
            <TableContainer
                sx={{ maxHeight: `calc(100vh - ${chartHeight + 120}px)` }}>
                <Table stickyHeader aria-label="sticky table" size="small">
                    <TableHead>
                        <TableRow>
                            {columns.map(column => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{
                                        ...cellStyle,
                                        minWidth: column.minWidth,
                                    }}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {trades.map((trade, id) =>
                            trade.trades.map((transaction, index) => (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    // key={`row_${index}`}
                                >
                                    <TableCell
                                        key="id"
                                        style={{
                                            ...cellStyle,
                                            borderBottom:
                                                index === 0
                                                    ? '1px solid #131722'
                                                    : '1px solid #9ba4ad',
                                        }}>
                                        {index === 0 ? id + 1 : ''}
                                    </TableCell>
                                    <TableCell key="date" style={cellStyle}>
                                        {transaction.date.slice(0, 10)}
                                    </TableCell>
                                    <TableCell key="type" style={cellStyle}>
                                        {transaction.action}
                                    </TableCell>
                                    <TableCell
                                        key="price"
                                        align="right"
                                        style={cellStyle}>
                                        {transaction.price.toFixed(2)}
                                    </TableCell>
                                    <TableCell
                                        key="size"
                                        align="right"
                                        style={cellStyle}>
                                        {transaction.size.toFixed(2)}
                                    </TableCell>
                                    {/* <TableCell
                                        key="type"
                                        align="right"
                                        style={{
                                            ...cellStyle,
                                            borderBottom:
                                                index === 0
                                                    ? '1px solid #131722'
                                                    : '1px solid #9ba4ad',
                                        }}>
                                        {index === 1 ? transaction.barlen : ''}
                                    </TableCell> */}
                                    <TableCell
                                        key="type"
                                        align="right"
                                        style={{
                                            ...cellStyle,
                                            borderBottom:
                                                index === 0
                                                    ? '1px solid #131722'
                                                    : '1px solid #9ba4ad',
                                        }}>
                                        {index === 1
                                            ? `${transaction.pnl.toFixed(
                                                  2,
                                              )}(${calculatePnLPct(
                                                  trade.trades,
                                              )}%)`
                                            : ''}
                                    </TableCell>
                                </TableRow>
                            )),
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default Transactions;
