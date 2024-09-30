import axios from "axios";
import Store from "../Store/Store";
import { setLoader } from "../Store/Actions/LoaderAction ";

const auth_headers = localStorage.getItem("token") ? {Authorization: `Bearer ${localStorage.getItem("token")}`} : {};

export const AxiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {
        ...auth_headers,
    },
    data: {},
    params: {},
});

AxiosInstance.interceptors.request.use(function (config) {

    Store.dispatch(setLoader(true))
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Add a response interceptor
AxiosInstance.interceptors.response.use(function (response) {

    Store.dispatch(setLoader(false));

    return response;
}, function (error) {
    Store.dispatch(setLoader(false));

    return Promise.reject(error);
});
