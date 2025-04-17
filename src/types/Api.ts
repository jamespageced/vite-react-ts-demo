import { LoginMethod, UserType } from './Auth';

export type ApiErrorResponse = {
  status: number;
  message: string;
  data: null;
};

//=============================================================================
//================================ API Headers ================================
//=============================================================================
export type ApiUsersHeaders = {
  Accept: string;
  Authorization?: string | undefined | null;
  'Content-Type': string;
};

export type ApiProductsHeaders = {
  Accept: string;
  'Content-Type': string;
};

//=============================================================================
//================================ API Options ================================
//=============================================================================
export interface AxiosApiUsersOptions {
  data?: any;
  headers: ApiUsersHeaders;
  params?: any;
}

export interface AxiosApiProductsOptions {
  data?: any;
  headers: ApiProductsHeaders;
  params?: any;
}

//=============================================================================
//================================= API Users =================================
//=============================================================================
export type ApiLoginExternalPayload = {
  email: string;
  password: string;
};
export type ApiLoginExternalResponseData = {
  accessToken: string;
  id: string;
  username: string;
  email: string;
  loginMethod: LoginMethod;
  refreshToken: string;
  userType: UserType;
};
export type ApiLoginExternalResponse = {
  data: ApiLoginExternalResponseData | null;
  message: string;
  status: number;
};
//=============================================================================

//=============================================================================
//================================ API Products ===============================
//=============================================================================
export type ApiProductsErrorResponse = {
  data: null;
  status: number;
  statusText: string;
};
//-----------------------------------------------------------------------------
export type ApiGetCarDetailsResponseData = {
  id: number;
  make: string;
  model: string;
  year: number;
  color: string;
  mileage: number;
  price: number;
  fuelType: string;
  transmission: string;
  engine: string;
  horsepower: number;
  features: Array<string>;
  owners: number;
  image: string;
};
export type ApiGetCarDetailsResponse = {
  data: ApiGetCarDetailsResponseData | null;
  status: number;
  statusText: string;
};
//-----------------------------------------------------------------------------
export type ApiGetCarListResponseData = Array<ApiGetCarDetailsResponseData>;
export type ApiGetCarListResponse = {
  data: ApiGetCarListResponseData | null;
  status: number;
  statusText: string;
};
//=============================================================================
