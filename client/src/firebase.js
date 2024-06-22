// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
 
  authDomain: "mern-blog-d8e19.firebaseapp.com",
  projectId: "mern-blog-d8e19",
  storageBucket: "mern-blog-d8e19.appspot.com",
  messagingSenderId: "381975958575",
  appId: "1:381975958575:web:b178130ecb8515314fa2da"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);