export type Toast = {
    id: string;
    msg: string;
    notifyType: ToastType;
};

export type ToastType = 'success' | 'warning' | 'error';
