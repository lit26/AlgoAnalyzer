/* eslint-disable react/react-in-jsx-scope */
import { render } from 'react-dom';
import App from './App';
import './index.scss';
import { ManagerProvider } from './context/ManagerContext';
import { BacktestProvider } from './context/BacktestContext';
import { NotificationProvider } from './context/NotificationContext';
import { NotesProvider } from './context/NotesContext';

declare global {
    interface Window {
        Bokeh: any;
    }
}

render(
    <NotesProvider>
        <NotificationProvider>
            <ManagerProvider>
                <BacktestProvider>
                    <App />
                </BacktestProvider>
            </ManagerProvider>
        </NotificationProvider>
    </NotesProvider>,
    document.getElementById('root'),
);
