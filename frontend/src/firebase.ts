// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: 'strange-passage-420918.firebaseapp.com',
	projectId: 'strange-passage-420918',
	storageBucket: 'strange-passage-420918.appspot.com',
	messagingSenderId: '556456058162',
	appId: '1:556456058162:web:712d0f0ef1e2f786068b2b',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
