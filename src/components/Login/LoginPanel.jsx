import { useRef } from 'react';
import useFetch from '../../hooks/use-fetch';
import Button from '../ui/Button';

const LoginPanel = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { sendRequest } = useFetch();

  const formSubmitHandler = e => {
    e.preventDefault();
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
      <Button text='Submit' type='submit' />
    </form>
  );
};

export default LoginPanel;
