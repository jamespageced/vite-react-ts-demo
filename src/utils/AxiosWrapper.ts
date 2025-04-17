import axios from 'axios';
import { getAxiosApiUsersOptions, getAxiosApiProductsOptions } from './ApiOptions';
import type { AxiosApiUsersOptions, AxiosApiProductsOptions } from '@/types';

//=============================================================================
//================================== API ONE ==================================
//=============================================================================
const apiUsersConfig = {
  baseURL: 'https://www.exampledev.com/',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
};
const requestApiUsersInstance = axios.create(apiUsersConfig);

export const axiosGetApiUsersRequest = ([endpoint, params]: any) =>
  getAxiosApiUsersOptions(true).then((options: AxiosApiUsersOptions) => {
    options.params = params;
    return requestApiUsersInstance.get(endpoint, options);
  });

export const axiosGetApiUsersRequestGuest = ([endpoint, params]: any) =>
  getAxiosApiUsersOptions(false).then((options: AxiosApiUsersOptions) => {
    options.params = params;
    return requestApiUsersInstance.get(endpoint, options);
  });

export const axiosPostApiUsersRequest = ([endpoint, data]: any) =>
  getAxiosApiUsersOptions(true).then((options: AxiosApiUsersOptions) => {
    options.params = {};
    return requestApiUsersInstance.post(endpoint, data, options);
  });

export const axiosPostApiUsersRequestGuest = ([endpoint, data]: any) =>
  getAxiosApiUsersOptions(false).then((options: AxiosApiUsersOptions) => {
    options.params = {};
    return requestApiUsersInstance.post(endpoint, data, options);
  });

export const axiosDeleteApiUsersRequest = ([endpoint, data]: any) =>
  getAxiosApiUsersOptions(true).then((options: AxiosApiUsersOptions) => {
    options.params = {};
    options.data = data;
    return requestApiUsersInstance.delete(endpoint, options);
  });

export const axiosPutApiUsersRequest = ([endpoint, data]: any) =>
  getAxiosApiUsersOptions(true).then((options: AxiosApiUsersOptions) => {
    return requestApiUsersInstance.put(endpoint, data, options);
  });

export const axiosLoginApiUsersRequest = async ([endpoint, data]: any) => {
  const options: AxiosApiUsersOptions = await getAxiosApiUsersOptions(false);
  return await requestApiUsersInstance.post(endpoint, data, options);
};

requestApiUsersInstance.interceptors.request.use(async (request: any) => {
  return request;
});

//=============================================================================
//================================== API TWO ==================================
//=============================================================================
const apiProductsConfig = {
  baseURL: 'https://www.freetestapi.com/api/v1/',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
};
const requestApiProductsInstance = axios.create(apiProductsConfig);

export const axiosGetApiProductsRequest = ([endpoint, params]: any) =>
  getAxiosApiProductsOptions().then((options: AxiosApiProductsOptions) => {
    options.params = params;
    return requestApiProductsInstance.get(endpoint, options);
  });

export const axiosPostApiProductsRequest = ([endpoint, data]: any) =>
  getAxiosApiProductsOptions().then((options: AxiosApiProductsOptions) => {
    options.params = {};
    return requestApiProductsInstance.post(endpoint, data, options);
  });

export const axiosDeleteApiProductsRequest = ([endpoint, data]: any) =>
  getAxiosApiProductsOptions().then((options: AxiosApiProductsOptions) => {
    options.params = {};
    options.data = data;
    return requestApiProductsInstance.delete(endpoint, options);
  });

export const axiosPutApiProductsRequest = ([endpoint, data]: any) =>
  getAxiosApiProductsOptions().then((options: AxiosApiProductsOptions) => {
    return requestApiProductsInstance.put(endpoint, data, options);
  });

requestApiProductsInstance.interceptors.request.use(async (request: any) => {
  return request;
});
