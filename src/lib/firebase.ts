import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "tech-ecommerce-pi.firebaseapp.com",
  projectId: "tech-ecommerce-pi",
  storageBucket: "tech-ecommerce-pi.firebasestorage.app",
  messagingSenderId: "511968961476",
  appId: "1:511968961476:web:e7c50a9f10bf474750ba91",
  measurementId: "G-6Q2KDGB5RT",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const provider = new GoogleAuthProvider();

export { app, auth, db, storage, provider };
