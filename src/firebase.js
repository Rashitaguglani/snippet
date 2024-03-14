import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPeFDjwtVI3BlsY-a5ncx-MHOMuPh1D3g",
  authDomain: "snippet-f41a9.firebaseapp.com",
  projectId: "snippet-f41a9",
  storageBucket: "snippet-f41a9.appspot.com",
  messagingSenderId: "574460642612",
  appId: "1:574460642612:web:6ef435b4ce0ddffc941161"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

if (process.env.NODE_ENV === "development") {
  connectFirestoreEmulator(firestore, "localhost", 8080);
  connectAuthEmulator(auth, "http://localhost:9099");
}

export { app, firestore, auth };