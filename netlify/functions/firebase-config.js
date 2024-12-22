// export const handler = async (event, context) => {
  // Access Firebase config from Netlify environment variables
  const {
    REACT_APP_FIREBASE_API_KEY,
    REACT_APP_FIREBASE_AUTH_DOMAIN,
    REACT_APP_FIREBASE_DATABASE_URL,
    REACT_APP_FIREBASE_PROJECT_ID,
    REACT_APP_FIREBASE_STORAGE_BUCKET,
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    REACT_APP_FIREBASE_APP_ID,
    REACT_APP_FIREBASE_MEASUREMENT_ID
  } = process.env;

  // Server-side operations go here without sending sensitive values to client
  // e.g. initialize Firebase admin and interact with Firestore, etc.

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Server-side config secured."
    }),
  };