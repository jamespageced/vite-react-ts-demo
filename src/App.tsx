import React, { useContext, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Router } from '@/navigation';
import { LoadingContext } from '@/stores';

const queryClient = new QueryClient();

export default function App() {
  const { loadInitialData } = useContext(LoadingContext);

  useEffect(() => {
    loadInitialData();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
