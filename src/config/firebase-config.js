// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyC0Ye7IrsngP-dzJBKraDGAk5C9O8zIbmA",
  authDomain: "firbaselearn-bfd14.firebaseapp.com",
  projectId: "firbaselearn-bfd14",
  storageBucket: "firbaselearn-bfd14.appspot.com",
  messagingSenderId: "1071060276546",
  appId: "1:1071060276546:web:e0e80f1cde81cd7cfde4db",
  measurementId: "G-QYD964RN6T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth(app);
export const GoogleProvider= new GoogleAuthProvider();

export const db=getFirestore(app);
export const storage=getStorage(app);
