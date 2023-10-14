import { initializeApp } from 'firebase/app';
import { getDatabase, ref } from "firebase/database";
//@ts-ignore
import {EXPO_CRYPTO_KEY, EXPO_API_KEY, EXPO_AUTH_DOMAIN, EXPO_DATABASE_URL, EXPO_PROJECT_ID, EXPO_STORAGE_BUCKET, EXPO_MESSAGING_SENDER_ID, EXPO_APP_ID, EXPO_MEASUREMENT_ID} from "@env";
// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: EXPO_API_KEY,
  authDomain: EXPO_AUTH_DOMAIN,
  databaseURL: EXPO_DATABASE_URL,
  projectId: EXPO_PROJECT_ID,
  storageBucket: EXPO_STORAGE_BUCKET,
  messagingSenderId: EXPO_MESSAGING_SENDER_ID,
  appId: EXPO_APP_ID,
  measurementId: EXPO_MEASUREMENT_ID,
};

console.log(EXPO_AUTH_DOMAIN)
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

export const flashCardsFolderRef = ref(database, "/FlashCards")
export const usersFolderRef = ref(database, "/Users")

