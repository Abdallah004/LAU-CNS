// src/auth.js

import { auth } from "./firebase-config.js"; // Correct import path
import { onAuthStateChanged, sendEmailVerification } from "firebase/auth"; // Import from 'firebase/auth'

// Monitor authentication state
onAuthStateChanged(auth, (user) => {
  if (!user || !user.emailVerified) {
    // Redirect to signup.html if not authenticated
    if (!window.location.pathname.includes("signup.html")) {
      window.location.href = "signup.html";
    }
  } else {
    if (window.location.pathname.includes("signup.html")) {
      window.location.href = "home.html";
    }
  }
});
