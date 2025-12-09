//////////////////////////////////////////////////////////////////////////////////////////////
// Import the functions needed from the SDKs needed
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, collection, writeBatch, getDocs } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


// Web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDEdlIDCnaOkICInJ60wYJmgAPTmdcUPM8",
    authDomain: "study-app-9fc66.firebaseapp.com",
    projectId: "study-app-9fc66",
    storageBucket: "study-app-9fc66.firebasestorage.app",
    messagingSenderId: "727936441692",
    appId: "1:727936441692:web:a1394ce6a4cdb101f6f599"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db, onAuthStateChanged, doc, setDoc, getDoc, updateDoc, collection, writeBatch, getDocs};
//////////////////////////////////////////////////////////////////////////////////////////////