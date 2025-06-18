// permissions.js

// Block access to features unless user is verified (age > 18, OTP done, info completed)

import { auth } from "./firebase.js"; import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js"; import { db } from "./firebase.js";

export async function isUserAuthorized(uid) { const docRef = doc(db, "users", uid); const docSnap = await getDoc(docRef);

if (!docSnap.exists()) return false; const data = docSnap.data();

return ( data.name && data.age && data.gender && data.phoneVerified === true && data.age >= 18 ); }

// Protect sections (UI lock) 
export function protectUIIfUnauthorized(uid, onUnauthorized) { isUserAuthorized(uid).then((authorized) => { if (!authorized) { onUnauthorized(); } }); }

