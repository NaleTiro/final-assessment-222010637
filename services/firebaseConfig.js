import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAEmPmPCPhAZz_WsKO9rB7NDed6eNH1vMA",
  authDomain: "dsw-final-test.firebaseapp.com",
  projectId: "dsw-final-test",
  storageBucket: "dsw-final-test.firebasestorage.app",
  messagingSenderId: "625772429571",
  appId: "1:625772429571:web:9b9a27549905a50bd8e936",
  measurementId: "G-VGTXFYE4GP",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
