import React, { useContext, useState } from 'react';
import { AuthContext, useAuthStore } from '@/stores';
import { MainView } from '@/components';
import type { AuthStore } from '@/types';

export default function Login(): ReactComponent {
  // variables
  const { isLoggingInCustomer, setIsLoggingInCustomer } = useAuthStore((store: AuthStore) => store);
  const { externalLogin, internalLogin } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // functions
  const handleCustomerLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // prevents disconnect warning in console
    externalLogin(email, password); // renders loading screen while global store handles login
  };

  // render
  return (
    <MainView className="view-shared view-login">
      {isLoggingInCustomer ? (
        <form className="view-customer-login-container" onSubmit={e => handleCustomerLoginSubmit(e)}>
          <label>
            Email:&nbsp;
            <input
              id="login-email-input"
              type="email"
              name="loginEmailInput"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </label>
          <label>
            Password:&nbsp;
            <input
              id="login-password-input"
              type="password"
              name="loginPasswordInput"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </label>
          <button disabled={!email || !password} type="submit">
            LOGIN
          </button>
        </form>
      ) : (
        <div className="view-select-login-container">
          <button onClick={() => setIsLoggingInCustomer(true)}>CUSTOMER&nbsp;LOGIN</button>
          <button onClick={internalLogin}>EMPLOYEE&nbsp;LOGIN</button>
        </div>
      )}
    </MainView>
  );
}
