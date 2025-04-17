import React from 'react';
import { Outlet } from 'react-router-dom';
import { useLoadingStore } from '@/stores';
import { LoadingScreen } from '@/views';
import type { LoadingStore } from '@/types';

export default function GuestRoutes(): ReactComponent {
  // variables
  const { isGlobalLoading, isWebsiteInitializing } = useLoadingStore((store: LoadingStore) => store);

  // render
  if (isGlobalLoading || isWebsiteInitializing) {
    return <LoadingScreen />;
  }
  return <Outlet />;
}
