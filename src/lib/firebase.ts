import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBVqs3FAhzdzjQnweE42tj8P0osAz8y8V0",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "wm-dev-office-web.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "wm-dev-office-web",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "wm-dev-office-web.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "925345158917",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:925345158917:web:d4607016e3cc0258ed896c",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
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
