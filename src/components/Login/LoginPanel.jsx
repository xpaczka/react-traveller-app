import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
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

  const emailRef = useRef();
  const passwordRef = useRef();

  const formSubmitHandler = e => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

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
      <div className='w-full flex flex-col mb-[20px]'>
        <label className='text-[14px] mb-[5px] pl-[5px]' htmlFor='email'>
          E-mail
        </label>
        <input
          ref={emailRef}
          type='text'
          name='email'
          id='email'
          className='py-[5px] px-[10px] rounded-[8px]'
          required
        />
      </div>
      <div className='w-full flex flex-col mb-[40px]'>
        <label className='text-[14px] mb-[5px] pl-[5px]' htmlFor='password'>
          Password
        </label>
        <input
          ref={passwordRef}
          type='password'
          name='password'
          id='password'
          className='py-[5px] px-[10px] rounded-[8px]'
          required
        />
      </div>
      {error && <p className='bg-[red] text-white py-[5px] px-[30px] mb-[10px] '>{error}</p>}
      <Button text='Submit' type='submit' />
    </form>
  );
};

export default LoginPanel;
