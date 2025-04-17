import type { ApiGetCarDetailsResponse, ApiGetCarListResponse, ApiProductsErrorResponse } from '@/types';
import { apiProductsEndpoints, axiosGetApiProductsRequest } from '@/utils';

function apiProductsErrorHandler(msg: string): ApiProductsErrorResponse {
  return {
    data: null,
    status: 500,
    statusText: msg
  };
}

export async function apiGetCarList(): Promise<ApiGetCarListResponse> {
  try {
    const response = await axiosGetApiProductsRequest([apiProductsEndpoints.cars]);
    return response;
  } catch (error: any) {
    return apiProductsErrorHandler(error.message);
  }
}

export async function apiGetCarDetails(id: number): Promise<ApiGetCarDetailsResponse> {
  try {
    const response = await axiosGetApiProductsRequest([`${apiProductsEndpoints.cars}/${id}`]);
    return response;
  } catch (error: any) {
    return apiProductsErrorHandler(error.message);
  }
}
