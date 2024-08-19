import axios from "axios";
import Cookies from 'js-cookie';
import {ECOMMERCE_URL } from "./baseUrl";
import { logout } from "../redux/slice/auth.slice";

const axiosInstance = axios.create({
    baseURL: ECOMMERCE_URL,
    withCredentials: true
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config)=>{
        const token = Cookies.get('accessToken');
        
        if(token){
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }

);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const response = await axios.post(ECOMMERCE_URL + 'users/generateNewToken', {}, { withCredentials: true })
                
                console.log("axiosInstance generateNewToken", response);
                
                if (response.status === 200) {
                    const { accessToken } = response.data;
                    originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                    return axiosInstance(originalRequest);
                }
            } catch (refreshError) {
                const { store } = require('../redux/Store').configureStore();
                const _id = localStorage.getItem("_id");
                store.dispatch(logout(_id));
                return Promise.reject(refreshError);
            }
        }
        
        return Promise.reject(error);
    }
);

export default axiosInstance;