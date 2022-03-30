// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { GithubAuthProvider, TwitterAuthProvider, GoogleAuthProvider, getAuth, FacebookAuthProvider  } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBt9XJS7dScrj2mn765v4zGf0Melvh8l5M",
  authDomain: "paginareserva-6ac0e.firebaseapp.com",
  projectId: "paginareserva-6ac0e",
  storageBucket: "paginareserva-6ac0e.appspot.com",
  messagingSenderId: "788411984291",
  appId: "1:788411984291:web:1f7deeaa2b808908d11216"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore()
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const twitterProvider = new TwitterAuthProvider();
export const githubProvider = new GithubAuthProvider();
