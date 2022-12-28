import { Route, Routes, Navigate } from 'react-router-dom';
import AppPage from './pages/AppPage';
import LoginPage from './pages/LoginPage';
import AuthContext from './context/auth-context';
import { useContext } from 'react';

const App = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Routes>
      {!isLoggedIn && <Route path='/' index element={<LoginPage />} />}
      {isLoggedIn && <Route path='/dashboard' element={<AppPage />} />}
      <Route path='*' element={isLoggedIn ? <Navigate replace to='/dashboard' /> : <Navigate replace to='/' />} />
    </Routes>
  );
};

export default App;
