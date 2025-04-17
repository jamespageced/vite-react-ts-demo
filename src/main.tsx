import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/assets/styles/globals.css';
import '@/components/components.css';
import '@/views/views.css';
import '@/views/productsChildren/products-children.css';
import { GlobalContextProvider } from '@/stores';
import App from './App.tsx';

console.log('VITE_API_USERS:', import.meta.env.VITE_PRODUCTS_API);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
  </StrictMode>
);
