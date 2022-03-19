import React, { useEffect } from 'react';
import './App.scss';
import Layout from './components/Layout';
import { getGeneralInfoRequest } from './apis/';
import { useManager } from './context/ManagerContext';
import { useToast } from './context/ToastContext';
import Toasts from './components/Toasts';
import { PlatformRes } from './types/response';

const App: React.FC = () => {
    const { setStockDataList, setStrategyList } = useManager();
    const { addToasts } = useToast();

    useEffect(() => {
        getGeneralInfoRequest()
            .then((res: PlatformRes) => {
                setStockDataList(res.historyData);
                setStrategyList(res.strategies);
            })
            .catch(err => {
                console.error(err);
                addToasts('Fail to get general information', 'error');
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
