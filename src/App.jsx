import { Route, Routes, Navigate } from 'react-router-dom';
import AppPage from './pages/AppPage';
import LoginPage from './pages/LoginPage';
import AuthContext from './context/auth-context';
import { useContext } from 'react';

const App = () => {
  const authCtx = useContext(AuthContext);

  return (
    <Routes>
      <Route path='/' index element={<LoginPage />} />
      {authCtx.isLoggedIn && <Route path='/dashboard' element={<AppPage />} />}
      <Route
        path='*'
        element={authCtx.isLoggedIn ? <Navigate replace to='/dashboard' /> : <Navigate replace to='/' />}
      />
    </Routes>
  );
};

export default App;
