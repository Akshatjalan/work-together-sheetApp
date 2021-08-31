import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyD6tOHwXWuoOD6Mf2Sx4EIw_KjP_oGnhiY",
  authDomain: "akshat-sheet.firebaseapp.com",
  projectId: "akshat-sheet",
  storageBucket: "akshat-sheet.appspot.com",
  messagingSenderId: "989235551258",
  appId: "1:989235551258:web:56c25a83c0b2dea0b8c5a3"
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;