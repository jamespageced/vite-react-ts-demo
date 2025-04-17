import { sleep } from '@/utils';
import testUsers from '@/assets/testData/testUsers.json'; // delete once api is ready
import { UserType } from '@/types/Auth';
import type { ApiErrorResponse, ApiLoginExternalPayload, ApiLoginExternalResponse, LoginMethod } from '@/types';

function apiUsersErrorHandler(msg: string): ApiErrorResponse {
  return {
    data: null,
    message: msg,
    status: 500
  };
}

export async function apiLoginExternal(payload: ApiLoginExternalPayload): Promise<ApiLoginExternalResponse> {
  try {
    console.log('payload:', payload);
    //===================== delete code when api is ready =====================
    const foundUser = testUsers.users.find(
      user =>
        user.email.toLowerCase() === payload.email.toLowerCase() &&
        user.password === payload.password &&
        user.loginMethod === 'EXTERNAL'
    );
    await sleep(1500);
    if (foundUser !== undefined) {
      return {
        status: 200,
        message: 'Success',
        data: {
          accessToken: 'accessToken goes here',
          id: foundUser.id,
          username: foundUser.username,
          email: foundUser.email,
          loginMethod: foundUser.loginMethod as LoginMethod,
          refreshToken: 'refreshToken goes here',
          userType: foundUser.userType as UserType
        }
      };
    }
    return {
      status: 400,
      message: 'Invalid email/password',
      data: null
    };
    //=========================================================================
    //...
    /* AND, uncomment code below when api is ready
      const response: ApiLoginExternalResponse = await axiosLoginApiUsersRequest([ apiUsersEndpoints.loginExternal, { payload }]);
      return response;
    */
  } catch (error: any) {
    return apiUsersErrorHandler(error.message);
  }
}
