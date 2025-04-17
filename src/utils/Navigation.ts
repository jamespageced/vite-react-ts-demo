type Routes = {
  about: string;
  checkout: string;
  contact: string;
  dashboard: string;
  home: string;
  login: string;
  products: string;
  register: string;
};

export const routes: Routes = Object.freeze({
  about: '/about',
  checkout: '/checkout',
  contact: '/contact',
  dashboard: '/dashboard',
  home: '/',
  login: '/login',
  products: '/products',
  register: '/register'
});
