import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBItkmP3VSjKIyFgD-cAfy76hynhejHb0U",
  authDomain: "mikelcoffee.firebaseapp.com",
  projectId: "mikelcoffee",
  storageBucket: "mikelcoffee.appspot.com",
  messagingSenderId: "205528888291",
  appId: "1:205528888291:web:90c9217ba4dcde0d2d26d6",
  //measurementId: "G-64GJ9JLNB4",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
