import { auth, database, sendPasswordResetEmail } from "./firebase-config.js";
import {
  signOut,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";

var password = document.getElementById("password"),
  confirm_password = document.getElementById("confirm_password");

function validatePassword() {
  if (password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity("");
  }
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;

document.addEventListener("DOMContentLoaded", () => {
  // Sign-up functionality
  const signUpForm = document.getElementById("signUpForm");
  const message = document.getElementById("message");
  const finalSignUpBtn = document.getElementById("finalSignUpBtn");

  signUpForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (
      !email.toLowerCase().endsWith("@lau.edu") &&
      !email.toLowerCase().endsWith("@lau.edu.lb")
    ) {
      message.textContent = "You must use an @lau.edu email address.";
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);
      await signOut(auth);
      message.textContent =
        "Sign-up successful! A verification email has been sent. Please verify your email before logging in.";
      console.log("Verification email sent to:", user.email);
      // Show the resend button and disable it for 1 minute
      disableButton(finalSignUpBtn);
      showResendButton();
    } catch (error) {
      message.textContent = `${error} Try resending verification, slow down and try again later.`;
      console.error("Error creating user:", error);
      showResendButtonNoTimeout();
    }
  });

  function showResendButton() {
    resendEmailButton.style.display = "block"; // Make the button visible
    disableButtonFor(resendEmailButton, 60); // Disable it for 60 seconds
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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Check if the user's email is verified
      if (!user.emailVerified) {
        loginMessage.style.display = "block";
        loginMessage.textContent =
          "Please verify your email before logging in.";
        console.warn("Email not verified for:", user.email);
        await signOut(auth);
        // alert(user.emailVerified)
        return;
      }

      loginMessage.textContent = "Log-in successful! Welcome back.";
      loginMessage.style.display = "block";
      document.location.href = "home.html";
      console.log("User logged in:", user);
    } catch (error) {
      loginMessage.textContent = `Error: ${error}`;
      loginMessage.style.display = "block";
      // alert(error)
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

function disableButton(button) {
  button.disabled = true; // Disable the button
  button.style.cursor = "not-allowed"; // Show the disabled cursor
}

const resendEmailButton = document.getElementById("resendEmail");
resendEmailButton.addEventListener("click", async () => {
  // Access the current user from Firebase Auth
  const user = auth.currentUser;

  if (user) {
    // Reload the user to get the latest emailVerified status
    await user.reload();

    if (user.emailVerified) {
      message.textContent =
        "Your email is already verified. No need to resend the verification email you can close signup and login easily.";
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
    alert("Unknown error please contact us or try again later.");
  }
});

const removeSignupBtn = document.getElementById("removeSignup");
const openSignupBtn = document.getElementById("openSignup");
const signUpDiv = document.getElementById("signUpDiv");
const logInDiv = document.getElementById("logInDiv");
removeSignupBtn.addEventListener("click", function () {
  signUpDiv.style.display = "none";
  logInDiv.style.display = "block";
});

openSignupBtn.addEventListener("click", function () {
  signUpDiv.style.display = "block";
  logInDiv.style.display = "none";
});

document
  .getElementById("forgotPasswordBtn")
  .addEventListener("click", async () => {
    const emailInput = document.getElementById("emailInput").value.trim();
    const messagePassword = document.getElementById("messagePassword");

    if (!emailInput) {
      messagePassword.textContent = "Please enter your email.";
      return;
    }

    try {
      await sendPasswordResetEmail(auth, emailInput);
      messagePassword.style.color = "green";
      messagePassword.textContent =
        "Password reset email sent! Check your inbox.";
    } catch (error) {
      console.error("Error sending password reset email:", error);
      messagePassword.style.color = "red";

      // Display appropriate error messagePasswords
      if (error.code === "auth/user-not-found") {
        messagePassword.textContent = "No user found with this email.";
      } else if (error.code === "auth/invalid-email") {
        messagePassword.textContent = "Invalid email address.";
      } else {
        messagePassword.textContent =
          "Failed to send password reset email. Try again later.";
      }
    }
  });

const removeForgotPassword = document.getElementById("removeForgotPassword");
const forgotPasswordBtn = document.getElementById("forgotPasswordBtnFirst");
const forgotPasswordContainer = document.getElementById(
  "forgotPasswordContainer"
);

removeForgotPassword.addEventListener("click", function () {
  logInDiv.style.display = "block";
  forgotPasswordContainer.style.display = "none";
});

forgotPasswordBtn.addEventListener("click", function () {
  forgotPasswordContainer.style.display = "flex";
  logInDiv.style.display = "none";
});
