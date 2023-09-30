
import { initializeApp } from "firebase/app";
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';
import firebase from 'firebase/compat/app'

export const firebaseConfig = {
  apiKey: "AIzaSyAyFg1OLYFVUWi3eNTvqwNu2VZVluDtecw",
  authDomain: "social-media-23985.firebaseapp.com",
  projectId: "social-media-23985",
  storageBucket: "social-media-23985.appspot.com",
  messagingSenderId: "1021759604717",
  appId: "1:1021759604717:web:8e00c78b8097233fec89e4",
  measurementId: "G-GY6GLL49QL"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const storage = getStorage(app)

export const firestore = firebase.firestore();
export const auth = firebase.auth();

// const analytics = getAnalytics(app);

