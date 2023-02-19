import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { LocalStorageService } from 'services';

declare module 'axios' {
  export interface AxiosRequestConfig {
    throwAccessDenied?: boolean; // is true if you want to self handle access denied exception
  }
}

const BASE_URL = process.env.REACT_APP_API_URL;

export const createService = (
  baseURL?: string,
  contentType = 'application/json',
  authToken?: string,
): AxiosInstance => {
  return interceptAuth(baseConfig(baseURL, contentType), false, authToken);
};

const interceptAuth = (
  config: AxiosRequestConfig,
  noLogin?: boolean,
  authToken?: string,
) => {
  const instance = axios.create(config);
  instance.interceptors.request.use(cf => {
    const token = authToken
      ? authToken
      : LocalStorageService.get(LocalStorageService.OAUTH_TOKEN);
    if (token && cf?.headers) {
      cf.headers['Authorization'] = 'Bearer ' + token;
    }
    return cf;
  });

  function createAxiosResponseInterceptor() {
    const interceptor = instance.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 403) {
          LocalStorageService.removeAllItem();
          window.location.href = '/';
          return Promise.reject(error);
        }
        if (error.response.status !== 401) {
          return Promise.reject(error);
        }
        axios.interceptors.response.eject(interceptor);
        // call api try refresh token ...
        window.location.href = '/';
      },
    );
  }
  createAxiosResponseInterceptor();
  return instance;
};

export const createServiceNoLogin = (
  baseURL?: string,
  contentType = 'application/json',
): AxiosInstance => {
  const instance = axios.create(baseConfig(baseURL, contentType));
  return instance;
};

const baseConfig = (baseURL?: string, contentType = 'application/json') => {
  return {
    baseURL,
    headers: {
      'Accept-Language': 'en-US',
      'Content-Type': contentType,
    },
  };
};

export const noLoginInstance = createServiceNoLogin(BASE_URL);
export const instance = createService(BASE_URL);
