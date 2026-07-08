import { getApps, initializeApp } from 'firebase/app'
import {
  addDoc,
  collection,
  getFirestore,
} from 'firebase/firestore'

const FIREBASE_SAVE_TIMEOUT_MS = 3000

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const hasFirebaseConfig = Object.values(firebaseConfig).every(Boolean)

const app = hasFirebaseConfig
  ? getApps()[0] || initializeApp(firebaseConfig)
  : null

const database = app ? getFirestore(app) : null

const withTimeout = (promise, timeoutMs) =>
  Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error('timeout')), timeoutMs)
    }),
  ])

export const saveLoggedUserToFirebase = async (user) => {
  if (!database) {
    return {
      saved: false,
      reason: 'missing-config',
    }
  }

  try {
    await withTimeout(
      addDoc(collection(database, 'users'), {
        username: user.username,
        password: user.password,
      }),
      FIREBASE_SAVE_TIMEOUT_MS,
    )

    return {
      saved: true,
    }
  } catch (error) {
    return {
      saved: false,
      reason: error.message,
    }
  }
}