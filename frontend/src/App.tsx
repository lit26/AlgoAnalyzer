import React, { useEffect } from 'react';
import './App.scss';
import Layout from './components/Layout';
import { getGeneralInfoRequest } from './apis/';
import { useBacktest } from './context/BacktestContext';
import Notifications from './components/Notifications';

const App: React.FC = () => {
    const { setStockDataList, setStrategyList } = useBacktest();

    useEffect(() => {
        getGeneralInfoRequest()
            .then((res: any) => {
                setStockDataList(res.historyData);
                setStrategyList(res.strategies);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <div className="App">
            <Notifications />
            <Layout />
        </div>
    );
};

export default App;
