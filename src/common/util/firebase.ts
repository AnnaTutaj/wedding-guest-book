import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: 'AIzaSyDDexHOpMQSdlZEYJTJtnI_9i0DjwquWwI',
  authDomain: 'wedding-guest-book-b9549.firebaseapp.com',
  projectId: 'wedding-guest-book-b9549',
  storageBucket: 'wedding-guest-book-b9549.appspot.com',
  messagingSenderId: '41500846776',
  appId: '1:41500846776:web:c55e089f07652ea8ff624d'
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
