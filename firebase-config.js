// firebase-config.js

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCQV_GoKqsgcPJwuM5j0XlOWkXRA7L81CM",
    authDomain: "lau-cns.firebaseapp.com",
    databaseURL: "https://lau-cns-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "lau-cns",
    storageBucket: "lau-cns.firebasestorage.app",
    messagingSenderId: "1002579331045",
    appId: "1:1002579331045:web:87d20ecd9bc5f637fa110c",
    measurementId: "G-JLT33CTQ9X"
  };
  
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const database = firebase.database();
  
  export { app, auth, database };
  