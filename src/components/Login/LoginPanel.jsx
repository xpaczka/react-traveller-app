import { useState, createRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useContext } from 'react';
import AuthContext from '../../context/auth-context';

// Firebase authentication
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

const displayErrorMessage = errorCode => {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'Invalid email';
    case 'auth/wrong-password':
      return 'Wrong password';
    default:
      return 'Wrong email and password combination';
  }
};

const LoginPanel = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const emailRef = createRef();
  const passwordRef = createRef();

  const formSubmitHandler = e => {
    e.preventDefault();

    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        authCtx.login(user);

        setError(false);
        navigate('/dashboard');
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;

        const errorText = displayErrorMessage(errorCode);
        setError(errorText);

        console.error(`${errorCode}: ${errorMessage}`);
      });
  };

  return (
    <form onSubmit={formSubmitHandler} className='w-full flex flex-col items-center mb-[30px]'>
      <Input ref={emailRef} label='E-mail' id='email' type='text' className='mb-[20px]' />
      <Input ref={passwordRef} label='Password' id='password' type='password' className='mb-[40px]' />
      {error && <p className='bg-[red] text-white py-[5px] px-[30px] mb-[10px] '>{error}</p>}
      <Button text='Submit' type='submit' />
    </form>
  );
};

export default LoginPanel;
