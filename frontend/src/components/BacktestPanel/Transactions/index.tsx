import React from 'react';
import { useBacktest } from '../../../context/BacktestContext';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { Transaction } from '../../../types/data';
import { columns } from './Column';

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
    const { chartSize, trades } = useBacktest();

    return (
        <>
            {trades ? (
                <Paper
                    sx={{
                        ...cellStyle,
                        width: '100%',
                        overflow: 'hidden',
                    }}>
                    <TableContainer
                        sx={{
                            maxHeight: `calc(100vh - ${
                                chartSize && chartSize.height + 120
                            }px)`,
                        }}>
                        <Table
                            stickyHeader
                            aria-label="sticky table"
                            size="small">
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
                                            key={`row_${trade.ref}_${index}`}>
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
                                            <TableCell
                                                key={`date_${trade.ref}_${index}`}
                                                style={cellStyle}>
                                                {transaction.date.slice(0, 10)}
                                            </TableCell>
                                            <TableCell
                                                key={`type_${trade.ref}_${index}`}
                                                style={cellStyle}>
                                                {transaction.action}
                                            </TableCell>
                                            <TableCell
                                                key={`price_${trade.ref}_${index}`}
                                                align="right"
                                                style={cellStyle}>
                                                {transaction.price.toFixed(2)}
                                            </TableCell>
                                            <TableCell
                                                key={`size_${trade.ref}_${index}`}
                                                align="right"
                                                style={cellStyle}>
                                                {transaction.size.toFixed(2)}
                                            </TableCell>
                                            <TableCell
                                                key={`pnl_${trade.ref}_${index}`}
                                                align="right"
                                                style={{
                                                    ...cellStyle,
                                                    borderBottom:
                                                        index === 0
                                                            ? '1px solid #131722'
                                                            : '1px solid #9ba4ad',
                                                }}>
                                                {index === 0
                                                    ? `${
                                                          trade.trades[1]
                                                              ? trade.trades[1].pnl.toFixed(
                                                                    2,
                                                                )
                                                              : ''
                                                      }`
                                                    : `(${calculatePnLPct(
                                                          trade.trades,
                                                      )}%)`}
                                            </TableCell>
                                        </TableRow>
                                    )),
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            ) : (
                <div className="placeholder">No backtest strategy running.</div>
            )}
        </>
    );
};

export default Transactions;
