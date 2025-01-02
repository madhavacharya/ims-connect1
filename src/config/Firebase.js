// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUYGfbdX_-R1Mc8wI_jCiwSnipLc7Irm4",
  authDomain: "ims-connect-bafd8.firebaseapp.com",
  projectId: "ims-connect-bafd8",
  storageBucket: "ims-connect-bafd8.firebasestorage.app",
  messagingSenderId: "834524202906",
  appId: "1:834524202906:web:9b15384e44c2002fb1dc23",
  measurementId: "G-LW8GF9D75X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
;

