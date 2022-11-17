// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMCA9qXEQyLwFZ9wf3jaH6safjcEER2zk",
  authDomain: "stillaw-1b875.firebaseapp.com",
  databaseURL: "https://stillaw-1b875-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "stillaw-1b875",
  storageBucket: "stillaw-1b875.appspot.com",
  messagingSenderId: "318760951011",
  appId: "1:318760951011:web:756319dcf390f768a879d6",
  measurementId: "G-724F8EG3SX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const fireStoreDB = getFirestore(app);
export const storage = getStorage(app);
 



