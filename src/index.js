// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApb5ojTCRqpYPZHlj8NgfILApcxB44rns",
  authDomain: "finance-club-wiut.firebaseapp.com",
  projectId: "finance-club-wiut",
  storageBucket: "finance-club-wiut.firebasestorage.app",
  messagingSenderId: "1069659712617",
  appId: "1:1069659712617:web:fe89882720f0cf35a5c6f8",
  measurementId: "G-50T9PN71F3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

console.log("ALHAMDULILLAH: Hello Financa");
