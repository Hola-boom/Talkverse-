// groups.js

import { db } from "./firebase.js"; import { collection, addDoc, getDocs, doc, updateDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Create a new group 
export async function createGroup(groupName, creatorId) { const groupRef = collection(db, "groups"); const docRef = await addDoc(groupRef, { name: groupName, members: [creatorId], createdAt: new Date().toISOString() }); return docRef.id; }

// Join an existing group 
export async function joinGroup(groupId, userId) { const groupDoc = doc(db, "groups", groupId); await updateDoc(groupDoc, { members: arrayUnion(userId) }); }

// Get all groups where user is a member 
export async function getUserGroups(userId) { const groupsSnapshot = await getDocs(collection(db, "groups")); const groups = []; groupsSnapshot.forEach((doc) => { const data = doc.data(); if (data.members.includes(userId)) { groups.push({ id: doc.id, ...data }); } }); return groups; }

