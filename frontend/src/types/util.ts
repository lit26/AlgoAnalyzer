export type Notification = {
    id: string;
    msg: string;
    notifyType: NotificationType;
};

export type NotificationType = 'success' | 'warning' | 'error';
