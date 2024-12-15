const fetchFirebaseConfig = async () => {
  try {
    const response = await fetch('/.netlify/functions/firebase-config');
    if (!response.ok) {
      throw new Error(`Failed to fetch Firebase config: ${response.statusText}`);
    }
    const firebaseConfig = await response.json();
    console.log("Fetched Firebase Config:", firebaseConfig); // Log the fetched config
    return firebaseConfig;
  } catch (error) {
    console.error("Error fetching Firebase config:", error);
    throw error;
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const firebaseConfig = await fetchFirebaseConfig();
    console.log("Initializing Firebase with Config:", firebaseConfig); // Log initialization
    const app = initializeApp(firebaseConfig); // Ensure config is passed correctly
    const auth = getAuth(app); // Ensure auth is initialized after Firebase is set up

    // Redirect unauthenticated users
    onAuthStateChanged(auth, (user) => {
      if (!user || !user.emailVerified) {
        console.log("No authenticated user. Redirecting to login.");
        window.location.href = "login.html";
      } else {
        console.log(`User is logged in: ${user.email}`);
      }
    });
  } catch (error) {
    console.error("Error during Firebase initialization:", error);
  }
});

