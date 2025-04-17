import { create } from 'zustand';
import type { LoadingStore } from '@/types';

export const useLoadingStore = create<LoadingStore>(set => ({
  isWebsiteInitializing: true,
  isGlobalLoading: false,
  loadingMsg: 'Initializing Website...',
  setIsWebsiteInitializing: (isLoading: boolean, msg: string = '') => {
    set({ isWebsiteInitializing: isLoading, loadingMsg: msg });
  },
  setIsGlobalLoading: (isLoading: boolean, msg: string = '') => {
    set({ isGlobalLoading: isLoading, loadingMsg: msg });
  }
}));
