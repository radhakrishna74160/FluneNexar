// Centralized Firebase + Gemini config that reads secure Vite env vars.
// Do NOT commit your real keys; keep them in the root .env (which should be gitignored).

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN as string,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID as string,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET as string,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_FIREBASE_APPID as string,
};

// Frontend access to Gemini key (still prefer proxying calls through your backend for security):
export const geminiKey = import.meta.env.VITE_GEMINI_API_KEY as string;

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
