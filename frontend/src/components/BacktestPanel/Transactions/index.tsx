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
import { columns } from './Column';

const cellStyle = {
    backgroundColor: '#131722',
    color: '#d1d4dc',
    borderBottom: '1px solid #9ba4ad',
};

const splitCellStyle = {
    ...cellStyle,
    padding: 0,
};

const Transactions: React.FC = () => {
    const { chartSize, backtestRes } = useBacktest();

    return (
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
                        {backtestRes &&
                            backtestRes.trades.map((trade, id) => (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={`row_${trade.ref}_${id}`}>
                                    <TableCell
                                        key={`id_${trade.ref}_${id}`}
                                        style={cellStyle}>
                                        {id + 1}
                                    </TableCell>
                                    <TableCell
                                        key={`date_${trade.ref}_${id}`}
                                        style={splitCellStyle}>
                                        {trade.trades.map(
                                            (transaction, index2) => (
                                                <div
                                                    key={`date_${trade.ref}_${id}_${index2}`}
                                                    style={{
                                                        borderBottom:
                                                            index2 === 0 &&
                                                            trade.trades
                                                                .length === 2
                                                                ? '1px solid #9ba4ad'
                                                                : '1px solid #131722',
                                                        padding: '6px 16px',
                                                    }}>
                                                    {transaction['date'].slice(
                                                        0,
                                                        10,
                                                    )}
                                                </div>
                                            ),
                                        )}
                                    </TableCell>
                                    <TableCell
                                        key={`type_${trade.ref}_${id}`}
                                        style={splitCellStyle}>
                                        {trade.trades.map(
                                            (transaction, index2) => (
                                                <div
                                                    key={`type_${trade.ref}_${id}_${index2}`}
                                                    style={{
                                                        borderBottom:
                                                            index2 === 0 &&
                                                            trade.trades
                                                                .length === 2
                                                                ? '1px solid #9ba4ad'
                                                                : '1px solid #131722',
                                                        padding: '6px 16px',
                                                    }}>
                                                    {transaction['action']}
                                                </div>
                                            ),
                                        )}
                                    </TableCell>
                                    <TableCell
                                        key={`price_${trade.ref}_${id}`}
                                        style={splitCellStyle}>
                                        {trade.trades.map(
                                            (transaction, index2) => (
                                                <div
                                                    key={`price_${trade.ref}_${id}_${index2}`}
                                                    style={{
                                                        borderBottom:
                                                            index2 === 0 &&
                                                            trade.trades
                                                                .length === 2
                                                                ? '1px solid #9ba4ad'
                                                                : '1px solid #131722',
                                                        padding: '6px 16px',
                                                        textAlign: 'right',
                                                    }}>
                                                    {transaction[
                                                        'price'
                                                    ].toFixed(2)}
                                                </div>
                                            ),
                                        )}
                                    </TableCell>
                                    <TableCell
                                        key={`size_${trade.ref}_${id}`}
                                        style={splitCellStyle}>
                                        {trade.trades.map(
                                            (transaction, index2) => (
                                                <div
                                                    key={`size_${trade.ref}_${id}_${index2}`}
                                                    style={{
                                                        borderBottom:
                                                            index2 === 0 &&
                                                            trade.trades
                                                                .length === 2
                                                                ? '1px solid #9ba4ad'
                                                                : '1px solid #131722',
                                                        padding: '6px 16px',
                                                        textAlign: 'right',
                                                    }}>
                                                    {transaction['size']}
                                                </div>
                                            ),
                                        )}
                                    </TableCell>

                                    <TableCell
                                        key={`pnl_${trade.ref}_${id}`}
                                        align="right"
                                        style={cellStyle}>
                                        {`${trade.trades[1].pnl.toFixed(2)}`}
                                        <br />
                                        {`(${trade.trades[1].pnlpct.toFixed(
                                            2,
                                        )}%)`}
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default Transactions;
