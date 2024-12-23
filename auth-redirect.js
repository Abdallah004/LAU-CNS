import { auth } from './firebase-config.js';
import { onAuthStateChanged, sendEmailVerification } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";

// Monitor authentication state
onAuthStateChanged(auth, (user) => {
  if (!user || !user.emailVerified) {
    // Redirect to signup.html if not authenticated
    if (!window.location.pathname.includes("signup.html")) {
      window.location.href = "signup.html";
    }
  } else{
    if (window.location.pathname.includes("signup.html")){
      window.location.href = "home.html"
    }
  }
});
