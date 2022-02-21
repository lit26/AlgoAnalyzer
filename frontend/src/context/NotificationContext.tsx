import React, { useState, useContext } from 'react';
import { ProviderProps } from '../types/provider';
import { Notification, NotificationType } from '../types/util';
import { v4 } from 'uuid';

interface NotificationContextProps {
    notifications: Notification[];
    setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
    addNotifications: (msg: string, notifyType: NotificationType) => void;
    removeNotifications: (deleteId: string) => void;
}

const NotificationContext = React.createContext<
    NotificationContextProps | undefined
>(undefined);

export function useNotification() {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useContext must be within Provider');
    }
    return context;
}

export const NotificationProvider: React.FC<ProviderProps> = ({ children }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const addNotifications = (msg: string, notifyType: NotificationType) => {
        setNotifications([
            ...notifications,
            {
                id: v4(),
                msg,
                notifyType,
            },
        ]);
    };

    const removeNotifications = (deleteId: string) => {
        setNotifications(
            notifications.filter(notification => notification.id !== deleteId),
        );
    };

    const value = {
        notifications,
        setNotifications,
        addNotifications,
        removeNotifications,
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
};
