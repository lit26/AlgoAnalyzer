import axios from 'axios';

export const API_URL = 'http://127.0.0.1:8000';

export const getRequest = (url: string) => {
    return axios.get(url);
};

export const postRequest = (url: string, postData: any) => {
    return axios.post(url, postData);
};

export const apiRequest = (url: string, method: string, postData?: any) => {
    return new Promise((resolve, reject) => {
        let req: Promise<unknown> | undefined;
        switch (method) {
            case 'GET':
                req = getRequest(url);
                break;
            case 'POST':
                req = postRequest(url, postData);
                break;
        }
        if (req) {
            req.then((res: any) => {
                resolve(res.data);
            }).catch(err => {
                reject(err);
            });
        }
    });
};
