import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBWpVWIhanYY51Z1dklCKHlcIIRCtXfXr8",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "wmd-office-web.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "wmd-office-web",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "wmd-office-web.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1062269186222",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1062269186222:web:d9ca69db4d249e7c77bd3f",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-P8G2GJNXN1",
};

const app = initializeApp(firebaseConfig);

const databaseId = import.meta.env.VITE_FIRESTORE_DATABASE_ID;
export const db =
  databaseId && databaseId !== "your-database-id"
    ? getFirestore(app, databaseId)
    : getFirestore(app);

export const auth = getAuth(app);

export const analyticsPromise = isSupported().then((supported) =>
  supported && firebaseConfig.measurementId ? getAnalytics(app) : null
);

export default app;
