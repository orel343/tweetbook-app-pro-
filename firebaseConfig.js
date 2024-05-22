// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyANkQBUW9Ja0SelN__sB0qARlAc15_PPBo",
  authDomain: "tweetbook-app.firebaseapp.com",
  databaseURL: "https://tweetbook-app-default-rtdb.firebaseio.com",
  projectId: "tweetbook-app",
  storageBucket: "tweetbook-app.appspot.com",
  messagingSenderId: "862583049768",
  appId: "1:862583049768:web:f72ac2804dc98987d12f1d",
  measurementId: "G-SYEEVMDYCB"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
export { auth, app, firestore, storage };
export const db = getFirestore(app);