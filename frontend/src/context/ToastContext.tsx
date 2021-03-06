import React, { useContext, useState } from 'react';
import { v4 } from 'uuid';

import { ProviderProps } from '../types/provider';
import { Toast, ToastType } from '../types/util';

interface ToastContextProps {
    toasts: Toast[];
    setToasts: React.Dispatch<React.SetStateAction<Toast[]>>;
    addToast: (msg: string, notifyType: ToastType) => void;
    removeToast: (deleteId: string) => void;
}

const ToastContext = React.createContext<ToastContextProps | undefined>(
    undefined,
);

export function useToast() {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useContext must be within Provider');
    }
    return context;
}

export const ToastProvider: React.FC<ProviderProps> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = (msg: string, notifyType: ToastType) => {
        setToasts([
            ...toasts,
            {
                id: v4(),
                msg,
                notifyType,
            },
        ]);
    };

    const removeToast = (deleteId: string) => {
        setToasts(toasts.filter(toast => toast.id !== deleteId));
    };

    const value = {
        toasts,
        setToasts,
        addToast,
        removeToast,
    };

    return (
        <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
    );
};
