import { render } from 'react-dom';
import App from './App';
import './index.scss';
import { SettingsProvider } from './context/SettingsContext';
import { ManagerProvider } from './context/ManagerContext';
import { NotificationProvider } from './context/NotificationContext';

declare global {
    interface Window {
        Bokeh: any;
    }
}

render(
    <SettingsProvider>
        <NotificationProvider>
            <ManagerProvider>
                <App />
            </ManagerProvider>
        </NotificationProvider>
    </SettingsProvider>,
    document.getElementById('root'),
);
