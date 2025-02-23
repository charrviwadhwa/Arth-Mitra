// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "api key",
  authDomain: "moneyhelper-80ff7.firebaseapp.com",
  projectId: "moneyhelper-80ff7",
  storageBucket: "moneyhelper-80ff7.firebasestorage.app",
  messagingSenderId: "110979244041",
  appId: "1:110979244041:web:c929ff9c608af40d3cd8d8",
  measurementId: "G-4PJFXRN1EN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
