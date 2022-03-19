import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import React from 'react';

import { useBacktest } from '../../../context/BacktestContext';
import { Trade } from '../../../types/data';
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

interface TransactionTableCellProps {
    id: 'date' | 'action' | 'price' | 'size';
    align?: 'left' | 'center' | 'right';
    format?: (value: number | string) => string;
}

interface TransactionTableCellUIProps extends TransactionTableCellProps {
    trade: Trade;
}

const splitCells: TransactionTableCellProps[] = [
    {
        id: 'date',
        format: (value: number | string) =>
            typeof value === 'string' ? value.slice(0, 10) : '',
    },
    { id: 'action' },
    {
        id: 'price',
        align: 'right',
        format: (value: number | string) =>
            typeof value === 'number' ? value.toFixed(2) : '',
    },
    {
        id: 'size',
        align: 'right',
        format: (value: number | string) =>
            typeof value === 'number' ? value.toFixed(2) : '',
    },
];

const TransactionTableCell: React.FC<TransactionTableCellUIProps> = ({
    id,
    trade,
    align = 'left',
    format,
}) => {
    return (
        <TableCell style={splitCellStyle}>
            {trade.trades.map((transaction, index) => (
                <div
                    key={`${id}_${trade.ref}_${index}`}
                    style={{
                        borderBottom:
                            index === 0 && trade.trades.length === 2
                                ? '1px solid #9ba4ad'
                                : '1px solid #131722',
                        padding: '6px 16px',
                        textAlign: align,
                    }}>
                    {format ? format(transaction[id]) : transaction[id]}
                </div>
            ))}
        </TableCell>
    );
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

                                    {splitCells.map(splitCell => (
                                        <TransactionTableCell
                                            key={`splitCell_${splitCell.id}`}
                                            id={splitCell.id}
                                            trade={trade}
                                            align={splitCell.align}
                                            format={splitCell.format}
                                        />
                                    ))}

                                    <TableCell
                                        key={`pnl_${trade.ref}_${id}`}
                                        align="right"
                                        style={{
                                            ...cellStyle,
                                            color:
                                                trade.trades.length > 1 &&
                                                trade.trades[1].pnl < 0
                                                    ? 'red'
                                                    : '#d1d4dc',
                                        }}>
                                        {trade.trades.length > 1 && (
                                            <>
                                                {`${trade.trades[1].pnl.toFixed(
                                                    2,
                                                )}`}
                                                <br />
                                                {`(${trade.trades[1].pnlpct.toFixed(
                                                    2,
                                                )}%)`}
                                            </>
                                        )}
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
