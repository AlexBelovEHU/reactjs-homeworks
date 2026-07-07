import { getApps, initializeApp } from 'firebase/app'
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from 'firebase/firestore'

interface LoggedUser {
  username: string
  loggedInAt: string
}

interface SaveLoggedUserResult {
  saved: boolean
  reason?: string
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const hasFirebaseConfig = Object.values(firebaseConfig).every((value) => Boolean(value))

const app = hasFirebaseConfig
  ? getApps()[0] || initializeApp(firebaseConfig)
  : null

const database = app ? getFirestore(app) : null

export const saveLoggedUserToFirebase = async (
  user: LoggedUser,
): Promise<SaveLoggedUserResult> => {
  if (!database) {
    return {
      saved: false,
      reason: 'missing-config',
    }
  }

  try {
    await addDoc(collection(database, 'loggedUsers'), {
      username: user.username,
      loggedInAt: user.loggedInAt,
      createdAt: serverTimestamp(),
    })

    return {
      saved: true,
    }
  } catch (error) {
    const reason = error instanceof Error ? error.message : 'Unknown Firebase error'

    return {
      saved: false,
      reason,
    }
  }
}