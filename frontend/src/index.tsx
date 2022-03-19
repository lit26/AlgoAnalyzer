/* eslint-disable react/react-in-jsx-scope */
import { render } from 'react-dom';

import App from './App';
import { BacktestProvider } from './context/BacktestContext';
import { ManagerProvider } from './context/ManagerContext';
import { NotesProvider } from './context/NotesContext';
import { ToastProvider } from './context/ToastContext';
import './index.scss';

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
