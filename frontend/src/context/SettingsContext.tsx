import React, { useState, useContext } from 'react';
import { ProviderProps } from '../types/provider';

interface SettingsContextProps {
    chartHeight: number;
    setChartHeight: React.Dispatch<React.SetStateAction<number>>;
}

const SettingsContext = React.createContext<SettingsContextProps | undefined>(
    undefined,
);

export function useSettings() {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useContext must be within Provider');
    }
    return context;
}

export const SettingsProvider: React.FC<ProviderProps> = ({ children }) => {
    const [chartHeight, setChartHeight] = useState<number>(0);

    const value = {
        chartHeight,
        setChartHeight,
    };

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
};
