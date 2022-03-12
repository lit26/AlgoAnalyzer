import React, { useState, useEffect } from 'react';
import CustomButton from '../../CustomButton';
import './StrategyManager.scss';
import Searchbar from '../../Searchbar';
import StrategyManagerItem from './StrategyManagerItem';
import { Modal, Backdrop } from '@mui/material/';
import { useManager } from '../../../context/ManagerContext';
import { useNotification } from '../../../context/NotificationContext';
import { getStrategyParams } from '../../../apis/strategy';

const StrategyManager: React.FC = () => {
    const [strategyManagerModalOpen, setStrategyManagerModalOpen] =
        useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const { strategyList, selectCurrentStrategy, updateCurrentStrategy } =
        useManager();
    const { addNotifications } = useNotification();

    useEffect(() => {
        if (!strategyManagerModalOpen) {
            setSearch('');
        }
    }, [strategyManagerModalOpen]);

    const strategyDisplayList =
        search !== ''
            ? strategyList.filter(strategy =>
                  strategy.name.toLowerCase().includes(search.toLowerCase()),
              )
            : strategyList;

    const handleCloseStrategyManager = () => {
        setStrategyManagerModalOpen(false);
    };

    const handleSearchChange = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    ) => {
        setSearch(e.target.value);
    };

    const handleSelectStrategy = (selectStrategyName: string) => {
        // check strategy params exist
        const selectStrategy = strategyList.find(
            strategy => strategy.name === selectStrategyName,
        );
        if (selectStrategy?.params) {
            selectCurrentStrategy(selectStrategy);
        } else {
            getStrategyParams(selectStrategyName)
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .then((res: any) =>
                    updateCurrentStrategy({
                        name: selectStrategyName,
                        params: res.params,
                    }),
                )
                .catch(err => addNotifications(err.response.data.msg, 'error'));
        }

        setStrategyManagerModalOpen(false);
    };

    return (
        <>
            <CustomButton
                onClick={() => setStrategyManagerModalOpen(true)}
                text="Fx"
            />

            <Modal
                open={strategyManagerModalOpen}
                onClose={handleCloseStrategyManager}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}>
                <div className="AlgoModal StrategyManager">
                    <h1>Strategies</h1>
                    <hr />
                    {/* Search bar */}
                    <div className="StrategyManager__input">
                        <Searchbar
                            search={search}
                            onChange={handleSearchChange}
                            placeholder="Type to search"
                        />
                    </div>

                    <hr className="subDivider" />
                    <div className="StrategyManagerList">
                        <div className="StrategyManagerList__nav">nav</div>
                        <div className="StrategyManagerItems">
                            {strategyDisplayList.map((strategy, index) => (
                                <StrategyManagerItem
                                    key={`strategyDisplay_${index}`}
                                    strategy={strategy.name}
                                    selectStrategy={handleSelectStrategy}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default StrategyManager;
