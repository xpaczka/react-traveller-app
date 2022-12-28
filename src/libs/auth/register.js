// Firebase import
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

// Constants import
import { FETCH_URL } from '../../constants';

export const authRegisterHandler = async (email, password, loginFunction, navigateTo, bodyData) => {
  let user, userId;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    user = userCredential.user;
    userId = user.uid;

    Object.assign(bodyData, { userId: userId });

    await fetch(`${FETCH_URL}.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyData),
    });
  } catch (error) {
    const code = error.code;
    const message = error.message;

    console.error(`${code}: ${message}`);
  }

  loginFunction(user);
  navigateTo('/dashboard');
};
