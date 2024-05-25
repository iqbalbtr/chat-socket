// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCxErDhpkKRGII5GiuEZ1QInUlsPiTpkGE",
  authDomain: "chat-app-d0a0a.firebaseapp.com",
  projectId: "chat-app-d0a0a",
  storageBucket: "chat-app-d0a0a.appspot.com",
  messagingSenderId: "872109769195",
  appId: "1:872109769195:web:2551772e32b08d5f40d9ae",
  measurementId: "G-M7Q5NRH32W"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);