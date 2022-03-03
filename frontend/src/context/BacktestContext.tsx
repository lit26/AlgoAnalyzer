import React, { useState, useContext } from 'react';
import { ProviderProps } from '../types/provider';
import { BacktestRes } from '../types/response';
import { Transaction, Trade } from '../types/data';

interface BacktestContextProps {
    trades: Trade[];
    setTrades: React.Dispatch<React.SetStateAction<Trade[]>>;
    updateBacktestResult: (backtestRes: BacktestRes) => void;
}

const BacktestContext = React.createContext<BacktestContextProps | undefined>(
    undefined,
);

export function useBacktest() {
    const context = useContext(BacktestContext);
    if (context === undefined) {
        throw new Error('useContext must be within Provider');
    }
    return context;
}

export const BacktestProvider: React.FC<ProviderProps> = ({ children }) => {
    const [trades, setTrades] = useState<Trade[]>([]);

    const updateBacktestResult = (backtestRes: BacktestRes) => {
        setTrades(backtestRes.trades);
    };

    const value = {
        trades,
        setTrades,
        updateBacktestResult,
    };

    return (
        <BacktestContext.Provider value={value}>
            {children}
        </BacktestContext.Provider>
    );
};
