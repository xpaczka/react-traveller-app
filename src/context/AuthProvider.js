import { useState } from 'react';
import AuthContext from './auth-context';

export const getUserFromDatabse = async data => {
  const users = await fetch('https://react-traveller-app-default-rtdb.europe-west1.firebasedatabase.app/users.json');
  const usersData = await users.json();

  const currentUser = usersData.find(user => user.userId === data);
  return currentUser;
};

const AuthProvider = props => {
  let initialToken;

  const [token, setToken] = useState(initialToken);
  const [currentUser, setCurrentUser] = useState(null);
  const isLoggedIn = !!token;

  const loginHandler = async data => {
    setToken(data.accessToken);

    const user = await getUserFromDatabse(data.uid);
    setCurrentUser(user);
  };

  //   const logoutHandler = () => {};

  const contextValue = {
    token: token,
    isLoggedIn: isLoggedIn,
    currentUser: currentUser,
    login: loginHandler,
    // logout: () => {},
  };

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthProvider;
