import React, { useEffect } from 'react';

import './App.scss';
import { getGeneralInfoRequest } from './apis/';
import Layout from './components/Layout';
import Toasts from './components/Toasts';
import { useBacktest } from './context/BacktestContext';
import { useManager } from './context/ManagerContext';
import { useToast } from './context/ToastContext';
import { PlatformRes } from './types/response';

const App: React.FC = () => {
    const { setStockDataList, setStrategyList, setSavedStrategyList } =
        useManager();
    const { setDefaultCash, setDefaultSizer } = useBacktest();
    const { addToast } = useToast();

    useEffect(() => {
        getGeneralInfoRequest()
            .then((res: PlatformRes) => {
                setStockDataList(res.historyData);
                setStrategyList(res.strategies);
                setSavedStrategyList(res.savedStrategies);
                setDefaultCash(res.settings.cash);
                setDefaultSizer(res.settings.sizer);
            })
            .catch(err => {
                console.error(err);
                addToast('Fail to get general information', 'error');
            });
    }, []);

    return (
        <div className="App">
            <Toasts />
            <Layout />
        </div>
    );
};

export default App;
