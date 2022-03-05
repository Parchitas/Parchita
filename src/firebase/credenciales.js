// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBt9XJS7dScrj2mn765v4zGf0Melvh8l5M",
  authDomain: "paginareserva-6ac0e.firebaseapp.com",
  projectId: "paginareserva-6ac0e",
  storageBucket: "paginareserva-6ac0e.appspot.com",
  messagingSenderId: "788411984291",
  appId: "1:788411984291:web:1f7deeaa2b808908d11216"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp