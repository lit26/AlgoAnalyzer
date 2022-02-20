import React, { useEffect } from 'react';
import './App.scss';
import Layout from './components/Layout';
import { getGeneralInfoRequest } from './apis/';
import { useBacktest } from './context/BacktestContext';

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
            <Layout />
        </div>
    );
};

export default App;
