// invite.js

import { db } from "./firebase.js"; import { collection, query, where, getDocs, doc, updateDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Search user by phone number (after OTP verified)
export async function searchUserByPhone(phone) { const q = query(collection(db, "users"), where("phone", "==", phone)); const snapshot = await getDocs(q); if (snapshot.empty) return null; return snapshot.docs[0]; }

// Invite user to group 
export async function inviteToGroup(groupId, userId) { const groupRef = doc(db, "groups", groupId); await updateDoc(groupRef, { members: arrayUnion(userId) }); }

// Add to personal contact list (optional)
export async function addContact(myId, contactId) { const userRef = doc(db, "users", myId); await updateDoc(userRef, { contacts: arrayUnion(contactId) }); }

