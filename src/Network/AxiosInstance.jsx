import axios from "axios";
import Store from "../Store/Store";
import { setLoader } from "../Store/Actions/LoaderAction ";
export const AxiosInstance = axios.create({
    baseURL: "https://retoolapi.dev/W1fCKB/",
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
