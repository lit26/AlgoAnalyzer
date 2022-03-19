import React, { useState, useEffect, useRef } from 'react';
import { useToast } from '../../context/ToastContext';
import { Toast } from '../../types/util';
import './Toasts.scss';

interface ToastProps {
    toast: Toast;
}

const MSG_TIME = 2000;
const INTERVAL_TIME = 20;
const intervalIncre = 100 / (MSG_TIME / INTERVAL_TIME);

const Toast: React.FC<ToastProps> = ({ toast }) => {
    const [width, setWidth] = useState<number>(100);
    const [exit, setExit] = useState<boolean>(false);
    const intervalRef: { current: NodeJS.Timeout | null } = useRef(null);
    const { removeToast } = useToast();

    const handleCloseToast = () => {
        setExit(true);
        if (intervalRef && intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        setTimeout(() => {
            removeToast(toast.id);
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
            clearInterval(intervalRef.current as NodeJS.Timeout);
        };
    }, []);

    // check progress bar is 0 width
    useEffect(() => {
        if (width < 0) {
            handleCloseToast();
        }
    }, [width]);

    return (
        <div className={`Toast ${exit ? 'exit' : ''}`}>
            <div className="Toast__content">
                <p>{toast.msg}</p>
            </div>

            <div
                className={`Toast__bar ${toast.notifyType}`}
                style={{ width: `${width}%` }}></div>
        </div>
    );
};

const Toasts: React.FC = () => {
    const { toasts } = useToast();

    return (
        <div className="Toasts">
            {toasts.map(toast => (
                <Toast key={toast.id} toast={toast} />
            ))}
        </div>
    );
};

export default Toasts;
