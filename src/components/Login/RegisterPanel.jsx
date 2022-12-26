// Hooks, React import
import { useContext, useEffect, useRef, createRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Context import
import CountriesContext from '../../context/countries-context';
import AuthContext from '../../context/auth-context';

// Components import
import Button from '../ui/Button';
import Input from '../ui/Input';
import ErrorMessage from '../ui/ErrorMessage';
import RegisterPasswordCondition from './RegisterPasswordCondition';

// Firebase import
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

// Libs import
import { validateEmail, validateName, validateCountry, validatePassword } from '../../libs/auth';

// Constants import
import { FETCH_URL } from '../../constants';

const RegisterPanel = () => {
  const { countries } = useContext(CountriesContext);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const [countriesList, setCountriesList] = useState([]);

  // Input error handling
  const [emailError, setEmailError] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [countryError, setCountryError] = useState(null);

  const [passwordCorrect, setPasswordCorrect] = useState({
    length: null,
    uppercase: null,
    lowercase: null,
    digit: null,
    specialCharacter: null,
  });

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
    setEmailError(!emailValid ? 'Invalid email' : null);

    const nameValid = validateName(name);
    setNameError(!nameValid ? 'Invalid name' : null);

    const countryValid = validateCountry(country);
    setCountryError(!countryValid ? 'Invalid country' : null);

    const passwordValid = Object.values(passwordCorrect).every(condition => condition === true);

    if (emailValid && nameValid && countryValid && passwordValid) {
      let user, userId;

      // Register data
      await createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          user = userCredential.user;
          userId = user.uid;
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;

          console.error(`${errorCode}: ${errorMessage}`);
        });

      // Create object in database
      await fetch(`${FETCH_URL}.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name, country: country, userId: userId }),
      });

      authCtx.login(user);
      navigate('/dashboard');
    }
  };

  const checkPassword = e => {
    const passwordValid = validatePassword(e.target.value);
    setPasswordCorrect(passwordValid);
  };

  useEffect(() => {
    const countryNames = countries.map(country => country.name.common);
    setCountriesList(countryNames);
  }, [countries]);

  return (
    <form onSubmit={formSubmitHandler} className='w-full flex flex-col items-center mb-[30px]'>
      <Input ref={emailRef} label='E-mail' id='email' type='text' className={emailError ? 'mb-[10px]' : 'mb-[20px]'} />
      {emailError && <ErrorMessage errorMessage={emailError} />}
      <Input ref={nameRef} label='Name' id='name' type='text' className={nameError ? 'mb-[10px]' : 'mb-[20px]'} />
      {nameError && <ErrorMessage errorMessage={nameError} />}
      <div className={`w-full flex flex-col ${countryError ? 'mb-[10px]' : 'mb-[20px]'}`}>
        <label className='text-[14px] mb-[5px] pl-[5px]' htmlFor='name'>
          Country
        </label>
        <select ref={countryRef} className='py-[5px] px-[10px] rounded-[8px]'>
          <option value=''>Choose country</option>
          {countriesList.map(country => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      {countryError && <ErrorMessage errorMessage={countryError} />}
      <Input
        ref={passwordRef}
        onChange={checkPassword}
        label='Password'
        id='password'
        type='password'
        className='mb-[20px]'
      />
      <div className='mb-[20px] w-full'>
        <RegisterPasswordCondition isValid={passwordCorrect?.length} text='Minimum length of 8 characters' />
        <RegisterPasswordCondition isValid={passwordCorrect?.uppercase} text='Uppercase letter' />
        <RegisterPasswordCondition isValid={passwordCorrect?.lowercase} text='Lowercase letter' />
        <RegisterPasswordCondition isValid={passwordCorrect?.digit} text='Digit' />
        <RegisterPasswordCondition isValid={passwordCorrect?.specialCharacter} text='Special character' />
      </div>
      <Button text='Submit' type='submit' />
    </form>
  );
};

export default RegisterPanel;
