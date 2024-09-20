import axios from "axios";
import Store from "../Store/Store";
import { setLoader } from "../Store/Actions/LoaderAction ";

const token = localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token")}` : "";


export const AxiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {
        Authorization: token,
    }
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
