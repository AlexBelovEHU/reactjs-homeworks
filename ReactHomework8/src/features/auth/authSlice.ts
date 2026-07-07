import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { saveLoggedUserToFirebase } from '../../firebase/saveLoggedUserToFirebase'

const AUTH_STORAGE_KEY = 'react-homework7.auth-user'

export interface AuthUser {
  username: string
  loggedInAt: string
}

interface LoginCredentials {
  username: string
  password: string
}

interface LoginSuccessPayload {
  user: AuthUser
  message: string
}

interface AuthState {
  currentUser: AuthUser | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  message: string
}

const readStoredUser = (): AuthUser | null => {
  try {
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY)
    return storedUser ? (JSON.parse(storedUser) as AuthUser) : null
  } catch {
    return null
  }
}

export const loginUser = createAsyncThunk<
  LoginSuccessPayload,
  LoginCredentials,
  { rejectValue: string }
>(
  'auth/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    const normalizedUserName = username.trim()
    const normalizedPassword = password.trim()

    if (!normalizedUserName || !normalizedPassword) {
      return rejectWithValue('User name and password are required.')
    }

    const nextUser: AuthUser = {
      username: normalizedUserName,
      loggedInAt: new Date().toISOString(),
    }

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser))

    const saveResult = await saveLoggedUserToFirebase(nextUser)

    if (!saveResult.saved && saveResult.reason === 'missing-config') {
      return {
        user: nextUser,
        message:
          'Logged in locally. Add Firebase env values to persist users remotely.',
      }
    }

    if (!saveResult.saved) {
      return {
        user: nextUser,
        message: 'Logged in, but Firebase save did not complete.',
      }
    }

    return {
      user: nextUser,
      message: 'Login successful.',
    }
  },
)

const initialState: AuthState = {
  currentUser: readStoredUser(),
  status: 'idle',
  message: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser(state) {
      localStorage.removeItem(AUTH_STORAGE_KEY)
      state.currentUser = null
      state.status = 'idle'
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
        state.message = ''
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.currentUser = action.payload.user
        state.message = action.payload.message
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed'
        state.message = action.payload || 'Unable to log in right now.'
      })
  },
})

export const { logoutUser } = authSlice.actions

export default authSlice.reducer