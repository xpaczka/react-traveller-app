import { createContext } from 'react';

const AuthContext = createContext({
  token: '',
  isLoggedIn: false,
  currentUser: null,
  login: () => {},
  logout: () => {},
});

export default AuthContext;
