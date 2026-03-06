// firebase-config
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// KEYS
const config = {
    apiKey: "AIzaSyDj20OygTTC-W_Q1r9y0eyEWHmqgmQJzY4",
    authDomain: "jirone-adtu.firebaseapp.com",
    projectId: "jirone-adtu",
    storageBucket: "jirone-adtu.firebasestorage.app",
    messagingSenderId: "79297011154",
    appId: "1:79297011154:web:87ab9c2762f6e9d3013c0b",
    measurementId: "G-HLJP6NFJRQ"
};

const appInstance = initializeApp(config);
export const db = getFirestore(appInstance);
export const auth = getAuth(appInstance);