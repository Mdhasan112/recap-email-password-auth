// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsb0x9O-cuSlhRzgKct20uHlh9B6CrxBY",
  authDomain: "reacp-email-password-auth.firebaseapp.com",
  projectId: "reacp-email-password-auth",
  storageBucket: "reacp-email-password-auth.appspot.com",
  messagingSenderId: "955740422863",
  appId: "1:955740422863:web:f741ab732b96c049352dba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;