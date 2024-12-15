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
      // Show the resend button and disable it for 1 minute
      showResendButton();

    } catch (error) {
      message.textContent = `${error} Try resending verification.`;
      console.error("Error creating user:", error);
      showResendButtonNoTimeout();
    }
  });

  function showResendButton() {
    resendEmailButton.style.display = "block"; // Make the button visible
    disableButtonFor(resendEmailButton, 60);  // Disable it for 60 seconds
  }

  function showResendButtonNoTimeout() {
    resendEmailButton.style.display = "block";
    disableButtonFor(resendEmailButton, 0); // Make the button visible
  }

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
      document.location.href = "home.html"
      console.log("User logged in:", user);
    } catch (error) {
      loginMessage.textContent = `Error: ${error}`;
      console.error("Error logging in:", error);
    }
  });
});
function disableButtonFor(button, seconds) {
  let remainingTime = seconds; // Initialize countdown time
  button.disabled = true; // Disable the button
  button.style.cursor = "not-allowed"; // Show the disabled cursor
  button.textContent = `Resend Verification Code (${remainingTime}s)`; // Set initial countdown text

  // Update the countdown every second
  const countdown = setInterval(() => {
    remainingTime--; // Decrement remaining time
    button.textContent = `Resend Verification Code (${remainingTime}s)`; // Update button text

    if (remainingTime <= 0) {
      clearInterval(countdown); // Stop the countdown
      button.disabled = false; // Re-enable the button
      button.style.cursor = ""; // Reset the cursor style
      button.textContent = "Resend Verification Code"; // Reset button text
    }
  }, 1000); // Run every second
}


const resendEmailButton = document.getElementById("resendEmail");
resendEmailButton.addEventListener("click", async () => {
  // Access the current user from Firebase Auth
  const user = auth.currentUser;

  if (user) {
    // Reload the user to get the latest emailVerified status
    await user.reload();

    if (user.emailVerified) {
      message.textContent = "Your email is already verified. No need to resend the verification email you can close signup and login easily."
    } else {
      try {
        // Resend the verification email
        message.textContent = "Resending verification email...";
        await sendEmailVerification(user);
        message.textContent = "Verification email resent!";
        disableButtonFor(resendEmailButton, 60);
      } catch (error) {
        console.error("Error resending verification email:", error);
      }
    }
  } else {
    alert("No user is currently signed in.");
  }
});


const removeSignupBtn = document.getElementById("removeSignup");
const openSignupBtn = document.getElementById("openSignup");
const signUpDiv = document.getElementById("signUpDiv");
const logInDiv = document.getElementById("logInDiv");
removeSignupBtn.addEventListener("click", function(){
  signUpDiv.style.display = "none";
  logInDiv.style.display = "block";
})

openSignupBtn.addEventListener("click", function(){
  signUpDiv.style.display = "block";
  logInDiv.style.display = "none";
})