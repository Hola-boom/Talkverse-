// dp.js — Base64 Version (No Firebase Storage)

import { db } from "./firebase.js"; import { doc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Upload DP as Base64 and overwrite old one
export async function uploadDP(userId, file, isGroup = false) { const reader = new FileReader();

// Read file as Base64 string 
const base64String = await new Promise((resolve, reject) => { reader.onload = () => resolve(reader.result.split(',')[1]);
// remove prefix 
reader.onerror = reject; reader.readAsDataURL(file); });

const docRef = doc(db, isGroup ? 'groups' : 'users', userId);

// Update Firestore with new Base64 string
await updateDoc(docRef, { dpBase64: base64String }); }

// Load DP URL for <img src="...">
export async function getDP(userId, isGroup = false) {
  const docRef = doc(db, isGroup ? 'groups' : 'users', userId);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();

  if (data?.dpBase64) {
    return `data:image/jpeg;base64,${data.dpBase64}`;
  } else {
    return 'default-dp.png'; // fallback image
  }
}

