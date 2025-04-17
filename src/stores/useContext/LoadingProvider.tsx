import React, { createContext, useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { useLoadingStore } from '@/stores';
import type { LoadingStore } from '@/types';

export const LoadingContext = createContext<any>('');

export function LoadingProvider(props: any): ReactComponent {
  // variables
  const { setIsWebsiteInitializing } = useLoadingStore((store: LoadingStore) => store);
  const { silentLogin } = useContext(AuthContext);

  // functions
  const loadInitialData = async () => {
    await silentLogin();
    setIsWebsiteInitializing(false, '');
  };

  // render
  return <LoadingContext.Provider value={{ loadInitialData }}>{props.children}</LoadingContext.Provider>;
}
