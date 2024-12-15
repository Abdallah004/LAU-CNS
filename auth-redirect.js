import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";

// Fetch Firebase config from Netlify function
const fetchFirebaseConfig = async () => {
  try {
    const response = await fetch('/.netlify/functions/firebase-config'); // Call the Netlify function
    const firebaseConfig = await response.json(); // Parse the JSON response
    return firebaseConfig;
  } catch (error) {
    console.error("Failed to fetch Firebase config:", error);
    throw new Error("Could not load Firebase configuration");
  }
};

// Initialize Firebase after fetching the config
fetchFirebaseConfig().then((config) => {
  const app = initializeApp(config);
  const auth = getAuth(app);

  // Redirect unauthenticated users
  onAuthStateChanged(auth, (user) => {
    if (!user || !user.emailVerified) {
      window.location.href = "login.html"; // Redirect to login page
    } else {
      console.log(`User is logged in: ${user.email}`);
    }
  });
});

