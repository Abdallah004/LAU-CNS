import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";

const fetchFirebaseConfig = async () => {
  try {
    // Fetch Firebase configuration from the Netlify function
    const response = await fetch('/.netlify/functions/firebase-config');
    if (!response.ok) {
      throw new Error(`Failed to fetch Firebase config: ${response.statusText}`);
    }
    const firebaseConfig = await response.json();
    console.log("Fetched Firebase Config:", firebaseConfig); // Debugging log
    return firebaseConfig;
  } catch (error) {
    console.error("Error fetching Firebase config:", error);
    throw error;
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Fetch and initialize Firebase
    const firebaseConfig = await fetchFirebaseConfig();
    console.log("Initializing Firebase with Config:", firebaseConfig); // Debugging log
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    // Check the authentication state of the user
    onAuthStateChanged(auth, (user) => {
      if (!user || !user.emailVerified) {
        console.log("No authenticated user. Redirecting to login.");
        window.location.href = "login.html"; // Redirect to login if unauthenticated
      } else {
        console.log(`User is logged in: ${user.email}`);
      }
    });
  } catch (error) {
    console.error("Error during Firebase initialization:", error);
  }
});
