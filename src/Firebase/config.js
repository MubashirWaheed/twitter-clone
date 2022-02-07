import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlPl5IaL3JnevSS9ohiEoOLiiW3UEy0oY",
  authDomain: "twitter-clone-b551b.firebaseapp.com",
  projectId: "twitter-clone-b551b",
  storageBucket: "twitter-clone-b551b.appspot.com",
  messagingSenderId: "444259853434",
  appId: "1:444259853434:web:d6b3d80a3f9ea18d3287c3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export {app, auth}