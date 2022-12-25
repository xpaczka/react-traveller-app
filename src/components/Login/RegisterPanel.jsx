import { useContext, useEffect, useRef, createRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import Input from '../ui/Input';
import CountriesContext from '../../context/countries-context';
import AuthContext from '../../context/auth-context';

// Firebase authentication
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

const FETCH_URL = 'https://react-traveller-app-default-rtdb.europe-west1.firebasedatabase.app/users.json';

const validateEmail = email => {
  if (email === '') return false;

  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const match = email.match(emailRegex);

  return match ? true : false;
};

const validateName = name => {
  return name.trim() !== '';
};

const validateCountry = country => {
  return country !== '';
};

const validatePassword = password => {
  if (password === '') return false;

  const passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
  const match = password.match(passwordRegex);

  return match ? true : false;
};

const RegisterPanel = () => {
  const { countries } = useContext(CountriesContext);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const [countriesList, setCountriesList] = useState([]);

  const emailRef = createRef();
  const nameRef = createRef();
  const countryRef = useRef();
  const passwordRef = createRef();

  const formSubmitHandler = async e => {
    e.preventDefault();

    const email = emailRef.current.value.trim();
    const name = nameRef.current.value.trim();
    const country = countryRef.current.value;
    const password = passwordRef.current.value.trim();

    const emailValid = validateEmail(email);
    const nameValid = validateName(name);
    const countryValid = validateCountry(country);
    const passwordValid = validatePassword(password);

    if (emailValid && nameValid && countryValid && passwordValid) {
      let userId;

      // Register data
      await createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          const user = userCredential.user;
          userId = user.uid;

          authCtx.login(user);
          navigate('/dashboard');
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;

          console.error(`${errorCode}: ${errorMessage}`);
        });

      // Create object in database
      await fetch(FETCH_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name, country: country, userId: userId }),
      });
    }
  };

  useEffect(() => {
    const countryNames = countries.map(country => country.name.common);
    setCountriesList(countryNames);
  }, [countries]);

  return (
    <form onSubmit={formSubmitHandler} className='w-full flex flex-col items-center mb-[30px]'>
      <Input ref={emailRef} label='E-mail' id='email' type='text' className='mb-[20px]' />
      <Input ref={nameRef} label='Name' id='name' type='text' className='mb-[20px]' />
      <div className='w-full flex flex-col mb-[20px]'>
        <label className='text-[14px] mb-[5px] pl-[5px]' htmlFor='name'>
          Country
        </label>
        <select ref={countryRef} className='py-[5px] px-[10px] rounded-[8px]' required>
          <option value=''>Choose country</option>
          {countriesList.map(country => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      <Input
        ref={passwordRef}
        label='Password'
        id='password'
        type='password'
        className='mb-[30px]'
        additionalInfo='Password must contain at least 8 characters, lowercase letter, uppercase letter, digit and special character'
      />
      <Button text='Submit' type='submit' />
    </form>
  );
};

export default RegisterPanel;
