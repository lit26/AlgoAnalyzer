import React, { useEffect } from 'react';

import './App.scss';
import { getGeneralInfoRequest } from './apis/';
import Layout from './components/Layout';
import Toasts from './components/Toasts';
import { useManager } from './context/ManagerContext';
import { useToast } from './context/ToastContext';
import { PlatformRes } from './types/response';

const App: React.FC = () => {
    const { setStockDataList, setStrategyList } = useManager();
    const { addToast } = useToast();

    useEffect(() => {
        getGeneralInfoRequest()
            .then((res: PlatformRes) => {
                setStockDataList(res.historyData);
                setStrategyList(res.strategies);
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
