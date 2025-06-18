import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const auth = getAuth();

// Recaptcha
window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
  size: 'invisible',
  callback: () => {
    // reCAPTCHA solved - submit the form
    onSignInSubmit();
  }
}, auth);

// Phone auth
function sendOTP() {
  const phoneNumber = "+91XXXXXXXXXX";
  const appVerifier = window.recaptchaVerifier;

  signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      alert("OTP Sent!");
    })
    .catch((error) => {
      console.error("OTP Error:", error.message);
      alert("OTP Failed: " + error.message);
    });
}

// Confirm
function verifyOTP(code) {
  window.confirmationResult.confirm(code)
    .then((result) => {
      const user = result.user;
      alert("Verified Successfully");
    })
    .catch((error) => {
      alert("Incorrect OTP: " + error.message);
    });
}
