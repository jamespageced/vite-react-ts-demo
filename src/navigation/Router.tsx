import React from 'react';
import { Navigate, Route, Routes as RoutesContainer } from 'react-router-dom';
import LoginExternalRoutes from './LoginExternalRoutes';
import LoginInternalRoutes from './LoginInternalRoutes';
import GuestRoutes from './GuestRoutes';
import AllRoutes from './AllRoutes';
import { About, Checkout, Contact, Dashboard, Home, Login, ProductDetails, Products, Register } from '@/views';
import { routes } from '@/utils';

export default function Router(): ReactComponent {
  return (
    <RoutesContainer>
      <Route element={<LoginExternalRoutes />}>
        <Route path={routes.checkout} element={<Checkout />} />
      </Route>
      <Route element={<LoginInternalRoutes />}>
        <Route path={routes.dashboard} element={<Dashboard />} />
      </Route>
      <Route element={<GuestRoutes />}>
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.register} element={<Register />} />
      </Route>
      <Route element={<AllRoutes />}>
        <Route index path={routes.home} element={<Home />} />
        <Route path={routes.about} element={<About />} />
        <Route path={routes.contact} element={<Contact />} />
        <Route path={routes.products} element={<Products />} />
        <Route path={`${routes.products}/:productId`} element={<ProductDetails />} />
        <Route path="*" element={<Navigate to={routes.home} replace />} />
      </Route>
    </RoutesContainer>
  );
}
