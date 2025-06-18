// otp.js

import { auth } from "./firebase.js"; import { RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

let confirmationResult = null;

// Render reCAPTCHA window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', { 'size': 'invisible', 'callback': (response) => { console.log("reCAPTCHA solved"); } });

export function sendOTP(phoneNumber) { return signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier) .then((result) => { confirmationResult = result; return true; }) .catch((error) => { console.error("OTP Error:", error); return false; }); }

export function verifyOTP(code) { return confirmationResult.confirm(code) .then((result) => { console.log("User signed in:", result.user); return result.user; }) .catch((error) => { console.error("Verification failed:", error); return null; }); }

