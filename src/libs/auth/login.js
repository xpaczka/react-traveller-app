// Firebase import
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

const displayAuthLoginError = code => {
  switch (code) {
    case 'auth/invalid-email':
      return 'Invalid email';
    case 'auth/wrong-password':
      return 'Wrong password';
    default:
      return 'Wrong email and password combination';
  }
};

export const authLoginHandler = async (email, password, loginFunction, errorFunction, navigateTo) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    const user = userCredential.user;
    await loginFunction(user);

    errorFunction(null);
    navigateTo('/dashboard');
  } catch (error) {
    const code = error.code;
    const message = error.message;

    const errorText = displayAuthLoginError(code);
    errorFunction(errorText);

    console.error(`${code}: ${message}`);
  }
};
