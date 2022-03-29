import { Backdrop, Modal } from '@mui/material/';
import React, { useEffect, useState } from 'react';

import {
    deleteSavedStrategyParams,
    getSavedStrategyParams,
    getStrategyParams,
} from '../../../apis/strategy';
import { useManager } from '../../../context/ManagerContext';
import { useToast } from '../../../context/ToastContext';
import { Strategy } from '../../../types/data';
import CustomButton from '../../CustomButton';
import Searchbar from '../../Searchbar';
import './StrategyManager.scss';
import StrategyManagerItem from './StrategyManagerItem';

const StrategyManager: React.FC = () => {
    const [strategyNav, setStrategyNav] = useState<string>('strategies');
    const [strategyManagerModalOpen, setStrategyManagerModalOpen] =
        useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const {
        strategyList,
        savedStrategyList,
        updateCurrentStrategy,
        deleteSavedStrategy,
    } = useManager();
    const { addToast } = useToast();

    useEffect(() => {
        if (!strategyManagerModalOpen) {
            setSearch('');
        }
    }, [strategyManagerModalOpen]);

    const chooseStrategyList =
        strategyNav === 'strategies' ? strategyList : savedStrategyList;

    const strategyDisplayList =
        search !== ''
            ? chooseStrategyList.filter(strategy =>
                  strategy.name.toLowerCase().includes(search.toLowerCase()),
              )
            : chooseStrategyList;

    const handleSearchChange = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    ) => {
        setSearch(e.target.value);
    };

    const handleSelectStrategy = (selectStrategy: Strategy) => {
        if (!selectStrategy.id) {
            getStrategyParams(selectStrategy.name)
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .then((res: any) =>
                    updateCurrentStrategy({
                        ...selectStrategy,
                        params: res.params,
                    }),
                )
                .catch(err => addToast(err.response.data.msg, 'error'));
        } else {
            getSavedStrategyParams(selectStrategy.id)
                .then(res => {
                    updateCurrentStrategy({
                        ...selectStrategy,
                        params: res.params,
                    });
                })
                .catch(err => addToast(err.response.data.msg, 'error'));
        }

        setStrategyManagerModalOpen(false);
    };

    const handleDelete = (selectStrategyId?: number) => {
        if (selectStrategyId) {
            deleteSavedStrategyParams(selectStrategyId)
                .then(() => deleteSavedStrategy(selectStrategyId))
                .catch(() => addToast('Fail to delete strategy.', 'error'));
        }
    };

    return (
        <>
            <CustomButton
                onClick={() => setStrategyManagerModalOpen(true)}
                text="Fx"
            />

            <Modal
                open={strategyManagerModalOpen}
                onClose={() => setStrategyManagerModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}>
                <div className="AlgoModal StrategyManager flex flex-col">
                    <h1>Strategies</h1>
                    <hr />
                    {/* Search bar */}
                    <div className="StrategyManager__input flex justify-center items-center">
                        <Searchbar
                            search={search}
                            onChange={handleSearchChange}
                            placeholder="Type to search"
                        />
                    </div>

                    <hr className="subDivider" />
                    <div className="StrategyManagerList flex flex-grow-1 relative">
                        <div className="StrategyManagerList__nav flex-30p">
                            <div
                                className={`${
                                    strategyNav === 'strategies' ? 'active' : ''
                                }`}
                                onClick={() => setStrategyNav('strategies')}>
                                Strategies
                            </div>
                            <div
                                className={`${
                                    strategyNav === 'saved' ? 'active' : ''
                                }`}
                                onClick={() => setStrategyNav('saved')}>
                                Saved strategies
                            </div>
                        </div>
                        <div className="StrategyManagerItems flex-70p absolute overflow-y-auto">
                            {strategyDisplayList.map((strategy, index) => (
                                <StrategyManagerItem
                                    key={`strategyDisplay_${index}`}
                                    strategy={strategy}
                                    selectStrategy={handleSelectStrategy}
                                    handleDelete={handleDelete}
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
