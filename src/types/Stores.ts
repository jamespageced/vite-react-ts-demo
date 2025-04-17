import { LoginMethod, UserType } from './Auth';

export type ViewerInfo = {
  id: string;
  username: string;
  email: string;
  loginMethod: LoginMethod;
  userType: UserType;
};

export type AuthStore = {
  viewerInfo: ViewerInfo;
  isLoggingInCustomer: boolean;
  setViewerInfo: (newViewerInfo: ViewerInfo) => void;
  setDefaultViewerInfo: () => void;
  setIsLoggingInCustomer: (isLoggingIn: boolean) => void;
};

export type LoadingStore = {
  isWebsiteInitializing: boolean;
  isGlobalLoading: boolean;
  loadingMsg: string;
  setIsWebsiteInitializing: (isLoading: boolean, msg?: string) => void;
  setIsGlobalLoading: (isLoading: boolean, msg?: string) => void;
};
