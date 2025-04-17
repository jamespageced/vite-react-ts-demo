import React, { createContext } from 'react';
import { apiLoginExternal } from '@/api';
import { useAuthStore } from '../Auth';
import { useLoadingStore } from '../Loading';
import {
  authTokenBearerPrefix,
  getStorageViewerInfo,
  setStorageViewerInfo,
  sleep,
  storageHandleLogout,
  updateAxiosApiUsersOptionsHeaders
} from '@/utils';
import type { ApiUsersHeaders, AuthStore, LoadingStore, ViewerInfo } from '@/types';
import { setStorageCustomerRefreshToken } from '@/utils/Storage';

export const AuthContext = createContext<any>('');

export function AuthProvider(props: any): ReactComponent {
  const { setDefaultViewerInfo, setIsLoggingInCustomer, setViewerInfo } = useAuthStore((store: AuthStore) => store);
  const { setIsGlobalLoading } = useLoadingStore((store: LoadingStore) => store);

  // functions
  const externalLogin = async (email: string, password: string): Promise<void> => {
    try {
      // renders loading screen
      setIsGlobalLoading(true, 'Logging In...');
      // gets the data from api server
      const response = await apiLoginExternal({ email, password });
      // handles errors
      if (response.status !== 200 || response.data === null) {
        throw new Error(response.message);
      }
      // deconstructs data from api (always do this, even if the types are the same)
      const viewer: ViewerInfo = {
        email: response.data.email,
        id: response.data.id,
        loginMethod: response.data.loginMethod,
        username: response.data.username,
        userType: response.data.userType
      };
      // update headers to store token for api calls
      const newUsersHeaders: Omit<ApiUsersHeaders, 'Accept' | 'Content-Type'> = {
        Authorization: `${authTokenBearerPrefix}${response.data.accessToken}`
      };
      updateAxiosApiUsersOptionsHeaders(newUsersHeaders);
      // update store for handling silent login when revisiting the website or refreshing
      setStorageCustomerRefreshToken(newUsersHeaders.Authorization as string);
      setStorageViewerInfo(viewer);
      // routes will reroute user back to home, once the loading screen is no longer rendering
      setViewerInfo(viewer);
      // stops rendering loading screen
      setIsLoggingInCustomer(false);
    } catch (error: any) {
      console.log('error:', error);
    } finally {
      setIsGlobalLoading(false, '');
    }
  };
  const internalLogin = (): void => {
    alert('To Do...');
    // insert OAUTH code here...
  };
  const externalSilentLogin = (viewerInfo: ViewerInfo): void => {
    /* uncoment when api is ready
      setIsGlobalLoading(true, 'Logging In...');
      login via api credentials here...
      hint: use getStorageCustomerRefreshToken();
      setIsGlobalLoading(false, '');
    */
    setViewerInfo(viewerInfo);
  };
  const internalSilentLogin = (viewerInfo: ViewerInfo): void => {
    // will more than likely use OAUTH here...
    setViewerInfo(viewerInfo);
  };
  const silentLogin = async (): Promise<void> => {
    const storageViewerInfo = getStorageViewerInfo();
    await sleep(1000);
    if (storageViewerInfo === null || storageViewerInfo.loginMethod === 'GUEST') {
      return;
    } else if (storageViewerInfo.loginMethod === 'EXTERNAL') {
      externalSilentLogin(storageViewerInfo);
    } else if (storageViewerInfo.loginMethod === 'INTERNAL') {
      internalSilentLogin(storageViewerInfo);
    }
  };
  const logout = (): void => {
    storageHandleLogout();
    setDefaultViewerInfo();
  };

  return (
    <AuthContext.Provider value={{ externalLogin, internalLogin, logout, silentLogin }}>
      {props.children}
    </AuthContext.Provider>
  );
}
