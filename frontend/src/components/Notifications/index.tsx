import React, { useState, useEffect, useRef } from 'react';
import { useNotification } from '../../context/NotificationContext';
import { Notification } from '../../types/util';
import './Notifications.scss';

interface NotificationProps {
    notification: Notification;
}

const MSG_TIME = 2000;
const INTERVAL_TIME = 20;
const intervalIncre = 100 / (MSG_TIME / INTERVAL_TIME);

const Notification: React.FC<NotificationProps> = ({ notification }) => {
    const [width, setWidth] = useState<number>(100);
    const [exit, setExit] = useState<boolean>(false);
    const intervalRef = useRef<any>(null);
    const { removeNotifications } = useNotification();

    const handleCloseNotification = () => {
        setExit(true);
        if (intervalRef && intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        setTimeout(() => {
            removeNotifications(notification.id);
        }, 400);
    };

    // update the progress bar
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            if (width > 0) {
                setWidth(prevWidth => prevWidth - intervalIncre);
            }
        }, INTERVAL_TIME);
        return () => {
            clearInterval(intervalRef.current);
        };
    }, []);

    // check progress bar is 0 width
    useEffect(() => {
        if (width < 0) {
            handleCloseNotification();
        }
    }, [width]);

    return (
        <div className={`Notification ${exit ? 'exit' : ''}`}>
            <div className="Notification__content">
                <p>{notification.msg}</p>
            </div>

            <div
                className={`Notificatio__bar ${notification.notifyType}`}
                style={{ width: `${width}%` }}></div>
        </div>
    );
};

const Notifications: React.FC = () => {
    const { notifications } = useNotification();

    return (
        <div className="Notifications">
            {notifications.map(notification => (
                <Notification
                    key={notification.id}
                    notification={notification}
                />
            ))}
        </div>
    );
};

export default Notifications;
