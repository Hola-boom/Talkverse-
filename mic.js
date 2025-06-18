// mic.js

// This module handles voice input for chat messages or name inputs using Web Speech API

export function startMicInput(callback, lang = 'en-US') { if (!('webkitSpeechRecognition' in window)) { alert("Your browser doesn't support Speech Recognition"); return; }

const recognition = new webkitSpeechRecognition(); recognition.continuous = false; recognition.interimResults = false; recognition.lang = lang;

recognition.onstart = () => { console.log("🎙️ Mic started"); document.body.classList.add("mic-listening"); };

recognition.onerror = (event) => { console.error("Mic error:", event.error); alert("Mic Error: " + event.error); document.body.classList.remove("mic-listening"); };

recognition.onend = () => { console.log("🎤 Mic stopped"); document.body.classList.remove("mic-listening"); };

recognition.onresult = (event) => { const transcript = event.results[0][0].transcript.trim(); console.log("🗣️ Recognized:", transcript); callback(transcript); };

recognition.start(); }

