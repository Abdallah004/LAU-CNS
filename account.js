const logOutBtn = document.getElementById("logout");
// const selectInput = document.getElementById("path-options");
const currentPath = document.getElementById("current-path");

// selectInput.addEventListener("change", () => {
//   currentPath.textContent = selectInput.value;
// });

import { auth, db } from "./firebase-config.js";
import { signOut } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";

// Log Out Function
logOutBtn.addEventListener("click", async () => {
  try {
    await signOut(auth);
    console.log("User logged out successfully.");

    // Redirect to login page after logout (optional)
    window.location.href = "signup.html";
  } catch (error) {
    console.error("Error logging out:", error);
  }
});

function getNameFromEmail(email) {
  if (!email) return ""; // Return empty string if email is undefined or null

  // Extract the part before the @
  const usernamePart = email.split("@")[0];

  // Split the username into parts (first and last name)
  const nameParts = usernamePart.split(".");

  // Capitalize each part and join with a space
  const formattedName = nameParts
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");

  return formattedName; // Return the formatted name
}

auth.onAuthStateChanged((user) => {
  if (user) {
    const email = user.email;
    const name = getNameFromEmail(email);

    console.log("User's Name:", name);
    document.getElementById("userName").textContent = name;
  } else {
    console.log("No user is signed in.");
  }
});

function getUserOccupation(email) {
  if (email.endsWith("@lau.edu")) {
    return "Student";
  } else if (email.endsWith("@lau.edu.lb")) {
    return "Staff";
  } else {
    return "Visitor";
  }
}

// Example usage with Firebase Authentication
auth.onAuthStateChanged((user) => {
  if (user) {
    const email = user.email;
    const occupation = getUserOccupation(email);

    console.log("User Occupation:", occupation);
    // Update the span in the HTML
    document.getElementById("userOccupation").textContent = occupation;
  } else {
    console.log("No user is signed in.");
    document.getElementById("userOccupation").textContent = "Unknown";
  }
});
