import { initializeApp } from "@firebase/app";
import { getAuth, connectAuthEmulator } from "@firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "@firebase/firestore";
import { getStorage, connectStorageEmulator } from "@firebase/storage";
import { getFunctions, connectFunctionsEmulator } from "@firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyDnoNW8qoxD05zYwbsza9OHTHNrTyXYd9c",
  authDomain: "pokedocs-85955.firebaseapp.com",
  projectId: "pokedocs-85955",
  storageBucket: "pokedocs-85955.appspot.com",
  messagingSenderId: "486856856630",
  appId: "1:486856856630:web:12d0c28eb9a4f69ad6b497",
};

const firebaseApp = initializeApp(firebaseConfig);

const firebaseAuth = getAuth(firebaseApp);
const firebaseDb = getFirestore();
const firebaseStorage = getStorage();
const firebaseFunctions = getFunctions();

if (!import.meta.env.PROD) {
  connectAuthEmulator(firebaseAuth, "http://localhost:9099");
  connectFirestoreEmulator(firebaseDb, "localhost", 8080);
  connectStorageEmulator(firebaseStorage, "localhost", 9199);
  connectFunctionsEmulator(firebaseFunctions, "localhost", 5001);
}

export { firebaseAuth, firebaseDb, firebaseStorage, firebaseFunctions };
