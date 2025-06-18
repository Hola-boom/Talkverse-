// utils.js

// Format timestamp to readable date 
export function formatDate(timestamp) { const date = new Date(timestamp); return date.toLocaleString(); }

// Auto-scroll to bottom of chat window
export function scrollToBottom(elementId) { const el = document.getElementById(elementId); if (el) el.scrollTop = el.scrollHeight; }

// Generate random unique ID (for temp use)
export function generateUID() { return '_' + Math.random().toString(36).substr(2, 9); }

// Preview selected image before upload
export function previewImage(fileInput, previewImgId) { const file = fileInput.files[0]; const reader = new FileReader(); reader.onload = function (e) { document.getElementById(previewImgId).src = e.target.result; }; if (file) reader.readAsDataURL(file); }

