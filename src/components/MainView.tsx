import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext, useAuthStore } from '@/stores';
import { routes } from '@/utils';
import type { AuthStore } from '@/types';

interface Props {
  isNavVisible?: boolean | null | undefined;
  className?: string | null | undefined;
  children?: ReactComponent;
}

export default function MainView({ isNavVisible = true, className = null, children = null }: Props): ReactComponent {
  const {
    viewerInfo: { loginMethod },
    setIsLoggingInCustomer
  } = useAuthStore((store: AuthStore) => store);
  const { logout } = useContext(AuthContext);
  return (
    <div className="main-view">
      <div className={isNavVisible ? 'main-view-header-container-with-nav' : 'main-view-header-container-without-nav'}>
        <h1>Vite+React Demo</h1>
        {isNavVisible ? (
          <div className="main-view-nav-container">
            <nav>
              <NavLink
                to={routes.home}
                className={({ isActive, isPending }) =>
                  isPending ? 'nav-link pending' : isActive ? 'nav-link active' : 'nav-link inactive'
                }
              >
                Home
              </NavLink>
              <NavLink
                to={routes.about}
                className={({ isActive, isPending }) =>
                  isPending ? 'nav-link pending' : isActive ? 'nav-link active' : 'nav-link inactive'
                }
              >
                About
              </NavLink>
              <NavLink
                to={routes.products}
                className={({ isActive, isPending }) =>
                  isPending ? 'nav-link pending' : isActive ? 'nav-link active' : 'nav-link inactive'
                }
              >
                Products
              </NavLink>
              <NavLink
                to={routes.contact}
                className={({ isActive, isPending }) =>
                  isPending ? 'nav-link pending' : isActive ? 'nav-link active' : 'nav-link inactive'
                }
              >
                Contact
              </NavLink>
            </nav>
            {loginMethod === 'GUEST' ? (
              <nav className="nav-guest">
                <NavLink to={routes.register} className="nav-link-register">
                  Register
                </NavLink>
                <NavLink to={routes.login} className="nav-link-login" onClick={() => setIsLoggingInCustomer(false)}>
                  Login
                </NavLink>
              </nav>
            ) : (
              <nav>
                <button onClick={logout}>Logout</button>
              </nav>
            )}
          </div>
        ) : null}
      </div>
      <div className={className ? className : ''}>{children}</div>
    </div>
  );
}
