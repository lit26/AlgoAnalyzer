import { render } from 'react-dom';
import App from './App';
import './index.scss';
import { SettingsProvider } from './context/SettingsContext';
import { BacktestProvider } from './context/BacktestContext';

render(
    <SettingsProvider>
        <BacktestProvider>
            <App />
        </BacktestProvider>
    </SettingsProvider>,
    document.getElementById('root'),
);
