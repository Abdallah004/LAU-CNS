import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";

// Firebase configuration (already set up in your project)
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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Redirect if user is not authenticated
onAuthStateChanged(auth, (user) => {
  if (!user || !user.emailVerified) {
    // Redirect to login.html if not authenticated or not verified
    window.location.href = "login.html";
  } else {
    console.log(`User logged in: ${user.email}`);
  }
});
