import type { ViewerInfo } from '@/types';

const localStorageKeys = Object.freeze({
  CUSTOMER_REFRESH_TOKEN: 'CUSTOMER_REFRESH_TOKEN',
  VIEWER_INFO: 'VIEWER_INFO'
});

const sessionStorageKeys = Object.freeze({});

const logoutStorageKeys = new Set([localStorageKeys.CUSTOMER_REFRESH_TOKEN, localStorageKeys.VIEWER_INFO]);

export const storageHandleLogout = (): void => {
  (Object.keys(localStorageKeys) as Array<keyof typeof localStorageKeys>)
    .filter(key => logoutStorageKeys.has(key))
    .forEach(key => {
      const value = localStorage.getItem(localStorageKeys[key]);
      if (value !== null) localStorage.removeItem(localStorageKeys[key]);
    });
  (Object.keys(sessionStorageKeys) as Array<keyof typeof sessionStorageKeys>)
    .filter(key => logoutStorageKeys.has(key))
    .forEach(key => {
      const value = sessionStorage.getItem(sessionStorageKeys[key]);
      if (value !== null) sessionStorage.removeItem(sessionStorageKeys[key]);
    });
};

//=============================================================================
//=============================== Local Storage ===============================
//=============================================================================
export const getStorageCustomerRefreshToken = (): ViewerInfo | null => {
  const data = localStorage.getItem(localStorageKeys.CUSTOMER_REFRESH_TOKEN);
  if (data === null) return null;
  return JSON.parse(data);
};
export const setStorageCustomerRefreshToken = (token: string): void => {
  const data = JSON.stringify(token);
  localStorage.setItem(localStorageKeys.CUSTOMER_REFRESH_TOKEN, data);
};
export const deleteCustomerRefreshToken = (): void => {
  localStorage.removeItem(localStorageKeys.CUSTOMER_REFRESH_TOKEN);
};
//-----------------------------------------------------------------------------
export const getStorageViewerInfo = (): ViewerInfo | null => {
  const data = localStorage.getItem(localStorageKeys.VIEWER_INFO);
  if (data === null) return null;
  return JSON.parse(data);
};
export const setStorageViewerInfo = (viewerInfo: ViewerInfo): void => {
  const data = JSON.stringify(viewerInfo);
  localStorage.setItem(localStorageKeys.VIEWER_INFO, data);
};
export const deleteStorageViewerInfo = (): void => {
  localStorage.removeItem(localStorageKeys.VIEWER_INFO);
};
//=============================================================================
//============================== Session Storage ==============================
//=============================================================================
