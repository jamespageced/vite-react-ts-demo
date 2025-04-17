import { create } from 'zustand';
import type { AuthStore, ViewerInfo } from '@/types';

function getDefaultViewerInfo(): ViewerInfo {
  return {
    id: '',
    username: 'Guest',
    email: '',
    loginMethod: 'GUEST',
    userType: 'GUEST'
  };
}

export const useAuthStore = create<AuthStore>(set => ({
  viewerInfo: getDefaultViewerInfo(),
  isLoggingInCustomer: false,
  setViewerInfo: (newViewerInfo: ViewerInfo) => {
    set({ viewerInfo: newViewerInfo });
  },
  setDefaultViewerInfo: () => {
    set({ viewerInfo: getDefaultViewerInfo() });
  },
  setIsLoggingInCustomer: (isLoggingIn: boolean) => {
    set({ isLoggingInCustomer: isLoggingIn });
  }
}));
