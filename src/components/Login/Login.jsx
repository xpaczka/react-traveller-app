// Hooks, React import
import { useState } from 'react';

// Components import
import Card from '../ui/Card';
import LoginPanel from './LoginPanel';
import RegisterPanel from './RegisterPanel';

// Libs import
import { authLoginHandler } from '../../libs/auth/login';
import { authRegisterHandler } from '../../libs/auth/register';

const Login = () => {
  const [loginPanel, setLoginPanel] = useState(true);
  const panelChangeHandler = () => setLoginPanel(!loginPanel);

  // Login handling function
  const loginHandler = (email, password, login, setError, navigate) =>
    authLoginHandler(email, password, login, setError, navigate);

  // Register handling function
  const registerHandler = (email, password, login, navigate, bodyData) => {
    authRegisterHandler(email, password, login, navigate, bodyData);
  };

  const informationContainer = (
    <>
      <p>{loginPanel ? `Don't have an account yet?` : `Already registered?`}</p>
      <p onClick={panelChangeHandler} className='font-medium cursor-pointer'>
        {loginPanel ? ' Register' : 'Login'}
      </p>
    </>
  );

  return (
    <Card className='max-w-[420px] w-full mx-auto bg-[lightblue] p-[40px]'>
      <h1 className='text-center font-bold text-[30px] mb-[30px]'>{loginPanel ? 'Login' : 'Register'}</h1>
      {loginPanel ? <LoginPanel onLogin={loginHandler} /> : <RegisterPanel onRegister={registerHandler} />}
      <div className='text-center'>{informationContainer}</div>
    </Card>
  );
};

export default Login;
