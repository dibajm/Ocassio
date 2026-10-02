// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCf8OvIPrVWMilWXXvCER2S475PV4IF8dM',
  authDomain: 'ocassio-7d106.firebaseapp.com',
  projectId: 'ocassio-7d106',
  storageBucket: 'ocassio-7d106.firebasestorage.app',
  messagingSenderId: '473221676990',
  appId: '1:473221676990:web:98a46f048f0ed443ab83ef',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
