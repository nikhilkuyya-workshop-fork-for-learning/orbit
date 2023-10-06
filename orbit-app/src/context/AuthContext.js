import React, { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { TOKEN_KEY, USER_INFO_KEY, EXPIRES_AT_KEY } from '../constant';
const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    const userInfo = localStorage.getItem(USER_INFO_KEY);
    const expiresAt = localStorage.getItem(EXPIRES_AT_KEY);
    setAuthState({token,userInfo : userInfo ? JSON.parse(userInfo) : {}, expiresAt})
  },[]);
  const history = useHistory();
  const [authState, setAuthState] = useState({
    token: null,
    expiresAt: null,
    userInfo: {}
  });

  const setAuthInfo = ({ token, expiresAt, userInfo }) => {
    localStorage.setItem(TOKEN_KEY,JSON.stringify(token));
    localStorage.setItem(USER_INFO_KEY,JSON.stringify(userInfo));
    localStorage.setItem(EXPIRES_AT_KEY,JSON.stringify(expiresAt));
    setAuthState({
      token,
      expiresAt,
      userInfo
    });
  }
  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_INFO_KEY);
    localStorage.removeItem(EXPIRES_AT_KEY);
    history.push('/');
    setAuthState({ token: '', expiresAt: null, userInfo: {} });
  };
  return (
    <Provider
      value={{
        authState,
        setAuthState: setAuthInfo,
        logout
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
