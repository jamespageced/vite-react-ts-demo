import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore, useLoadingStore } from '@/stores';
import { LoadingScreen } from '@/views';
import { routes } from '@/utils';
import type { AuthStore, LoadingStore } from '@/types';

export default function LoginExternalRoutes(): ReactComponent {
  // variables
  const {
    viewerInfo: { loginMethod }
  } = useAuthStore((store: AuthStore) => store);
  const { isGlobalLoading, isWebsiteInitializing } = useLoadingStore((store: LoadingStore) => store);

  // render
  if (isGlobalLoading || isWebsiteInitializing) {
    return <LoadingScreen />;
  } else if (loginMethod !== 'EXTERNAL') {
    return <Navigate to={routes.home} replace />;
  }
  return <Outlet />;
}
