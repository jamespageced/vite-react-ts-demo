import { getAccessTokenPayload } from './Helpers';
import type { ApiUsersHeaders, ApiProductsHeaders, AxiosApiUsersOptions, AxiosApiProductsOptions } from '@/types';

type ApiHeaderValues = string | undefined | null;

export const authTokenBearerPrefix = 'Bearer ';

const axiosApiUsersOptions: AxiosApiUsersOptions = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
};

const axiosApiProductsOptions: AxiosApiProductsOptions = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
};

function isAccessTokenExpired(jwtToken: string): boolean {
  // check token payload
  const jwtTokenPayload = getAccessTokenPayload(jwtToken);
  // check token expiration date in payload
  const jwtTokenExpiration = jwtTokenPayload.exp;
  const now = Math.floor(new Date().getTime() / 1000); // token exp shaved off milliseconds
  // if (current time is greater than expiration time)
  return now > jwtTokenExpiration;
}

const updateApiUsersTokensAsNeeded = async (): Promise<void> => {
  // write in your token handling here, include using isAccessTokenExpired()...
  // axiosApiUsersOptions.headers.Authorization = `${authTokenBearerPrefix}${jwtToken}`;
};

const updateApiProductsTokensAsNeeded = async (): Promise<void> => {
  // write in your token handling here, include using isAccessTokenExpired()...
  // axiosApiProductsOptions.headers.Authorization = `${authTokenBearerPrefix}${jwtToken}`;
};

export const getAxiosApiUsersOptions = async (isAuthRequired: boolean): Promise<AxiosApiUsersOptions> => {
  try {
    if (!isAuthRequired) {
      // customize options for Api Users
      return axiosApiUsersOptions;
    }
    await updateApiUsersTokensAsNeeded();
    return axiosApiUsersOptions;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getAxiosApiProductsOptions = async (): Promise<AxiosApiProductsOptions> => {
  try {
    // this api currently isn't using any tokens
    // await updateApiProductsTokensAsNeeded();
    return axiosApiProductsOptions;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateAxiosApiUsersOptionsHeaders = (newApiHeaders: Partial<ApiUsersHeaders>): void => {
  let key: keyof Partial<ApiUsersHeaders>;
  for (key in newApiHeaders) (axiosApiUsersOptions.headers[key] as ApiHeaderValues) = newApiHeaders[key];
};

export const updateAxiosApiProductsOptionsHeaders = (newApiHeaders: Partial<ApiProductsHeaders>): void => {
  let key: keyof Partial<ApiProductsHeaders>;
  for (key in newApiHeaders) (axiosApiProductsOptions.headers[key] as ApiHeaderValues) = newApiHeaders[key];
};
