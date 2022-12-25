// Hooks, React import
import { useState } from 'react';

// Components import
import Card from '../ui/Card';
import LoginPanel from './LoginPanel';
import RegisterPanel from './RegisterPanel';

const Login = () => {
  const [loginPanel, setLoginPanel] = useState(true);
  const panelChangeHandler = () => setLoginPanel(!loginPanel);

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
      {loginPanel ? <LoginPanel /> : <RegisterPanel />}
      <div className='text-center'>{informationContainer}</div>
    </Card>
  );
};

export default Login;
