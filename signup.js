var password = document.getElementById("password")
  , confirm_password = document.getElementById("confirm_password");

function validatePassword(){
  if(password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity('');
  }
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";

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

document.addEventListener("DOMContentLoaded", () => {
  // Sign-up functionality
  const signUpForm = document.getElementById("signUpForm");
  const message = document.getElementById("message");

  signUpForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email.endsWith("@lau.edu")) {
      message.textContent = "You must use an @lau.edu email address.";
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);
      message.textContent = "Sign-up successful! A verification email has been sent. Please verify your email before logging in.";
      console.log("Verification email sent to:", user.email);
    } catch (error) {
      message.textContent = `Error: ${error.message}`;
      console.error("Error creating user:", error);
    }
  });

  // Log-in functionality
  const logInForm = document.getElementById("logInForm");
  const loginMessage = document.getElementById("loginMessage");

  logInForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if the user's email is verified
      if (!user.emailVerified) {
        loginMessage.textContent = "Please verify your email before logging in.";
        console.warn("Email not verified for:", user.email);
        return;
      }

      loginMessage.textContent = "Log-in successful! Welcome back.";
      console.log("User logged in:", user);
    } catch (error) {
      loginMessage.textContent = `Error: ${error.message}`;
      console.error("Error logging in:", error);
    }
  });
});


const resendEmailButton = document.getElementById("resendEmail");
resendEmailButton.addEventListener("click", async () => {
  // Access the current user from Firebase Auth
  const user = auth.currentUser;

  if (user && !user.emailVerified) {
    try {
      // Resend the verification email
      await sendEmailVerification(user);
      alert("Verification email has been resent!");

      // Reload the user to update the email verification status
      await user.reload();
      console.log("Email verified:", user.emailVerified);
    } catch (error) {
      console.error("Error resending verification email:", error);
    }
  } else if (!user) {
    alert("No user is currently signed in.");
  } else {
    alert("Your email is already verified.");
  }
});
