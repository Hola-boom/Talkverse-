// auth.js

import { auth, db } from "./firebase.js"; import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

export async function saveUserInfo(uid, name, age, gender, phone) { if (parseInt(age) < 18) { alert("You must be 18 or older to use Talkverse."); return false; }

const userRef = doc(db, "users", uid); await setDoc(userRef, { name, age, gender, phone, joined: new Date().toISOString(), }); return true; }

export async function getUserInfo(uid) { const userRef = doc(db, "users", uid); const userSnap = await getDoc(userRef); return userSnap.exists() ? userSnap.data() : null; }

