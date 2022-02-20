import axios, { Method } from 'axios';

export const API_URL = 'http://127.0.0.1:8000';

export const apiRequest = (url: string, method: Method, data?: any) => {
    return new Promise((resolve, reject) => {
        axios({
            method,
            url,
            data,
        })
            .then((res: any) => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
            });
    });
};
