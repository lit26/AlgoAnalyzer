import React from 'react';
import { useNotification } from '../../context/NotificationContext';
import { Notification } from '../../types/util';

interface NotificationProps {
    notification: Notification;
}

const Notification: React.FC<NotificationProps> = ({ notification }) => {
    console.log(notification);
    return <div>index</div>;
};

const Notifications: React.FC = () => {
    const { notifications } = useNotification();

    return (
        <div>
            {notifications.map(notification => (
                <Notification notification={notification} />
            ))}
        </div>
    );
};

export default Notifications;
