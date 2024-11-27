// src/firebase.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDzdTVUocq92-NdBF1tByX3wudL5wmW9PY",
  authDomain: "pbl4-f183a.firebaseapp.com",
  projectId: "pbl4-f183a",
  storageBucket: "pbl4-f183a.appspot.com",
  messagingSenderId: "915661157521",
  appId: "1:915661157521:web:d862afb73bc1bb280e3b30",
  databaseURL: "https://pbl4-f183a-default-rtdb.firebaseio.com/", // Optional for Realtime Database
  measurementId: "G-4TDZFPVN8C",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
