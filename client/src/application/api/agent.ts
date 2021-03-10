import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import Cookies from "js-cookie";
import {IAuthFormValues, IUser} from "../../infrastructure/models/auth";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

// set the token on every request
axios.interceptors.request.use((config: AxiosRequestConfig) => {
  const token =  localStorage.getItem("token");
  console.log(token);
  if(token){
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error))

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string, config?: AxiosRequestConfig) => axios.get(url, config).then(responseBody),
  post: (url: string, body?: any, config?: AxiosRequestConfig) => axios.post(url, body, config).then(responseBody),
  put: (url: string, body?: any, config?: AxiosRequestConfig) => axios.put(url, body, config).then(responseBody)
}

export const AuthRequest = {
  signUp: (values: IAuthFormValues)  => requests.post(`/signup`, values),
  login: (values: IAuthFormValues)  => requests.post(`/login`, values),
  logout: (): Promise<Record<string, unknown>> => requests.post(`/logout`),
  getCurrentUser: () => requests.get(`/user`)
}

export const BookRequest = {
  getAllBooks: () => requests.get(`/books`)
}
