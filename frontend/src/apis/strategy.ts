import { API_URL, apiRequest } from './util';

export const getStrategyParams = (strategy: string) => {
    return apiRequest(`${API_URL}/api/v1/strategy/${strategy}`, 'GET');
};
