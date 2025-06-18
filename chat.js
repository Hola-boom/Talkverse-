// chat.js

import { db } from "./firebase.js"; import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

export async function sendMessage(groupId, senderId, senderName, message) { const msgRef = collection(db, groups/${groupId}/messages); await addDoc(msgRef, { senderId, senderName, message, timestamp: serverTimestamp(), }); }

export function subscribeToMessages(groupId, callback) { const msgRef = collection(db, groups/${groupId}/messages); const q = query(msgRef, orderBy("timestamp")); return onSnapshot(q, (snapshot) => { const messages = snapshot.docs.map(doc => doc.data()); callback(messages); }); }

