/* eslint-disable react/react-in-jsx-scope */
import { render } from 'react-dom';
import App from './App';
import './index.scss';
import { ManagerProvider } from './context/ManagerContext';
import { BacktestProvider } from './context/BacktestContext';
import { ToastProvider } from './context/ToastContext';
import { NotesProvider } from './context/NotesContext';

declare global {
    interface Window {
        Bokeh: any;
    }
}

render(
    <NotesProvider>
        <ToastProvider>
            <ManagerProvider>
                <BacktestProvider>
                    <App />
                </BacktestProvider>
            </ManagerProvider>
        </ToastProvider>
    </NotesProvider>,
    document.getElementById('root'),
);
