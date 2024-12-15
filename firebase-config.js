// Fetch Firebase configuration from the Netlify function
export const fetchFirebaseConfig = async () => {
  try {
    const response = await fetch('/.netlify/functions/firebase-config'); // Fetch from Netlify function
    const firebaseConfig = await response.json(); // Parse the JSON response
    return firebaseConfig;
  } catch (error) {
    console.error("Failed to fetch Firebase config:", error);
    throw new Error("Could not load Firebase configuration");
  }
};


