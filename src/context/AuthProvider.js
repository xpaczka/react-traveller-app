import { useState, useEffect } from 'react';
import AuthContext from './auth-context';

const getUserFromDatabse = async data => {
  const users = await fetch('https://react-traveller-app-default-rtdb.europe-west1.firebasedatabase.app/users.json');
  const usersData = await users.json();

  const currentUser = usersData.find(user => user.userId === data);
  return currentUser;
};

const retrieveStoredData = () => {
  const storedToken = localStorage.getItem('token');
  const storedUser = JSON.parse(localStorage.getItem('currentUser'));

  return { token: storedToken, currentUser: storedUser };
};

const AuthProvider = props => {
  const storedData = retrieveStoredData();
  let initialData;

  if (storedData) {
    initialData = storedData;
  }

  const [token, setToken] = useState(initialData.token);
  const [currentUser, setCurrentUser] = useState(initialData.currentUser);
  const isLoggedIn = !!token;

  const loginHandler = async data => {
    setToken(data.accessToken);

    const user = await getUserFromDatabse(data.uid);
    setCurrentUser(user);
  };

  const logoutHandler = () => {
    setToken(null);
    setCurrentUser(null);

    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    }

    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
  }, [token, currentUser]);

  const contextValue = {
    token: token,
    isLoggedIn: isLoggedIn,
    currentUser: currentUser,
    login: loginHandler,
    logout: logoutHandler,
  };

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthProvider;
