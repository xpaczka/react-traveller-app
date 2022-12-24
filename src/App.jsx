import AppPage from './pages/AppPage';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

const App = () => {
  return (
    <Routes>
      <Route path='/dashboard' element={<AppPage />} />
      <Route path='/' element={<LoginPage />} />
    </Routes>
  );
};

export default App;
