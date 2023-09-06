
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAyFg1OLYFVUWi3eNTvqwNu2VZVluDtecw",
  authDomain: "social-media-23985.firebaseapp.com",
  projectId: "social-media-23985",
  storageBucket: "social-media-23985.appspot.com",
  messagingSenderId: "1021759604717",
  appId: "1:1021759604717:web:8e00c78b8097233fec89e4",
  measurementId: "G-GY6GLL49QL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const storage = getStorage(app)