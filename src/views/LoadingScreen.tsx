import React from 'react';
import { MainView, Spinner } from '@/components';
import { useLoadingStore } from '@/stores';
import { LoadingStore } from '@/types';

export default function LoadingScreen(): ReactComponent {
  // variables
  const { loadingMsg } = useLoadingStore((store: LoadingStore) => store);

  // render
  return (
    <MainView isNavVisible={false} className="view-shared view-loading-screen">
      <h2>{loadingMsg}</h2>
      <Spinner />
    </MainView>
  );
}
