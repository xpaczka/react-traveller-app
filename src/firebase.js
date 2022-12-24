import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDg9mr_Kxlrdc8qxPu9bYt94jmTU0FRVnM',
  authDomain: 'react-traveller-app.firebaseapp.com',
  databaseURL: 'https://react-traveller-app-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'react-traveller-app',
  storageBucket: 'react-traveller-app.appspot.com',
  messagingSenderId: '454173145812',
  appId: '1:454173145812:web:645e2ac48ab9f0eb15d941',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);
