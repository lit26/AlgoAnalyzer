/* eslint-disable react/react-in-jsx-scope */
import { render } from 'react-dom';
import App from './App';
import './index.scss';
import { ManagerProvider } from './context/ManagerContext';
import { BacktestProvider } from './context/BacktestContext';
import { NotificationProvider } from './context/NotificationContext';

declare global {
    interface Window {
        Bokeh: any;
    }
}

render(
    <NotificationProvider>
        <ManagerProvider>
            <BacktestProvider>
                <App />
            </BacktestProvider>
        </ManagerProvider>
    </NotificationProvider>,
    document.getElementById('root'),
);
