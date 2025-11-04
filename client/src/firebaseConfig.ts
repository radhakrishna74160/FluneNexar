// Centralized Firebase + Gemini config that reads secure Vite env vars.
// Do NOT commit your real keys; keep them in the root .env (which should be gitignored).

export const firebaseConfig = {
  apiKey: "AIzaSyD21xXwF-15pLS7fuuaUDrpF8VbuoxIFUw",
  authDomain: "flunenexar.firebaseapp.com",
  projectId: "flunenexar",
  storageBucket: "flunenexar.firebasestorage.app",
  messagingSenderId: "530831092551",
  appId: "1:530831092551:web:bce6be0f1ea0fe0059ba62",
  measurementId: "G-WD47KH7G0X"
};

// Frontend access to Gemini key (still prefer proxying calls through your backend for security):
export const geminiKey = "AIzaSyCp3SE_qPAZiqW2TQEEktJIwhpI4kNcXEs";

// Basic runtime validation to catch missing/placeholder keys early and give
// actionable instructions instead of a vague Firebase runtime error.
(() => {
  const apiKey = firebaseConfig.apiKey;
  if (!apiKey || apiKey.startsWith('your_') || apiKey.trim() === '') {
    // Throwing here surfaces a clear error in the dev overlay with guidance.
    throw new Error(
      'Firebase API key is missing or looks like a placeholder.\n' +
      '1) Add your Firebase keys to the project root .env file using the VITE_ prefix.\n' +
      "2) Restart the dev server so Vite loads the new env values.\n" +
      "3) If the key was committed or leaked, rotate it immediately in the Firebase console."
    );
  }
})();
