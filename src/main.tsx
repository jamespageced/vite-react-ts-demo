import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/assets/styles/globals.css';
import '@/assets/styles/components.css';
import '@/assets/styles/views.css';
import '@/assets/styles/views-products-children.css';
import { GlobalContextProvider } from '@/stores';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
  </StrictMode>
);
