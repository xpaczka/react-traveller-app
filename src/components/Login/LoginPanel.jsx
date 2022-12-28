// Hooks, React import
import { useState, useContext, createRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Context import
import AuthContext from '../../context/auth-context';

// Components import
import Button from '../ui/Button';
import Input from '../ui/Input';
import ErrorMessage from '../ui/ErrorMessage';

const LoginPanel = props => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const emailRef = createRef();
  const passwordRef = createRef();

  const formSubmitHandler = e => {
    e.preventDefault();

    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    props.onLogin(email, password, login, setError, navigate);
  };

  return (
    <form onSubmit={formSubmitHandler} className='w-full flex flex-col items-center mb-[30px]'>
      <Input ref={emailRef} label='E-mail' id='email' type='text' className='mb-[20px]' />
      <Input ref={passwordRef} label='Password' id='password' type='password' className='mb-[40px]' />
      {error && <ErrorMessage errorMessage={error} />}
      <Button text='Submit' type='submit' />
    </form>
  );
};

export default LoginPanel;
