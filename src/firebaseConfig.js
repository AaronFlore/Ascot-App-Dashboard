import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_EH4xS27tXnelPdp89bNyaw2k8HYUU9Q",
  authDomain: "plant-tracking-app.firebaseapp.com",
  projectId: "plant-tracking-app",
  storageBucket: "plant-tracking-app.appspot.com",
  messagingSenderId: "223753271816",
  appId: "1:223753271816:web:d7d42a7310dcd70ef1efbd",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
