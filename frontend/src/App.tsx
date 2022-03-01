import React, { useEffect } from 'react';
import './App.scss';
import Layout from './components/Layout';
import { getGeneralInfoRequest } from './apis/';
import { useManager } from './context/ManagerContext';
import { useNotification } from './context/NotificationContext';
import Notifications from './components/Notifications';

const App: React.FC = () => {
    const { setStockDataList, setStrategyList } = useManager();
    const { addNotifications } = useNotification();

    useEffect(() => {
        getGeneralInfoRequest()
            .then((res: any) => {
                setStockDataList(res.historyData);
                setStrategyList(res.strategies);
            })
            .catch(err =>
                addNotifications('Fail to get general information', 'error'),
            );
    }, []);

    return (
        <div className="App">
            <Notifications />
            <Layout />
        </div>
    );
};

export default App;
