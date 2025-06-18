// firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js"; import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js"; import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js"; import { getStorage } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-storage.js";

const firebaseConfig = { apiKey: "AIzaSyDuWXeF8rIlDrQluZo514FzarFIvIOrOrw", authDomain: "talkverse-49451.firebaseapp.com", projectId: "talkverse-49451", storageBucket: "talkverse-49451.appspot.com", messagingSenderId: "953700215867", appId: "1:953700215867:web:58540984c67dfa71ef401e", measurementId: "G-XY7JKZB9HH" };

// Initialize Firebase 
export const app = initializeApp(firebaseConfig); export const auth = getAuth(app); export const db = getFirestore(app); export const storage = getStorage(app);

