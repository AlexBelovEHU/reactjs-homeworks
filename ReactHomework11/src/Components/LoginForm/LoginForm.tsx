import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { loginUser } from '../../features/auth/authSlice'
import styles from './LoginForm.module.css'

const LoginForm = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const authStatus = useAppSelector((state) => state.auth.status)
  const authMessage = useAppSelector((state) => state.auth.message)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const resultAction = await dispatch(loginUser({ username, password }))

    if (loginUser.fulfilled.match(resultAction)) {
      setPassword('')
      navigate('/order')
    }
  }

  return (
    <section className={styles.loginSection}>
      <h1 className={styles.title}>Log in</h1>

      <form className={styles.formCard} onSubmit={handleSubmit}>
        <label className={styles.fieldRow}>
          <span className={styles.fieldLabel}>User name</span>
          <input
            type="text"
            className={styles.fieldInput}
            placeholder="UserName"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>

        <label className={styles.fieldRow}>
          <span className={styles.fieldLabel}>Password</span>
          <input
            type="password"
            className={styles.fieldInput}
            placeholder="********************"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

        <div className={styles.actions}>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={authStatus === 'loading'}
          >
            {authStatus === 'loading' ? 'Saving...' : 'Submit'}
          </button>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={() => {
              setUsername('')
              setPassword('')
            }}
          >
            Cancel
          </button>
        </div>

        {authMessage ? <p className={styles.statusMessage}>{authMessage}</p> : null}
      </form>
    </section>
  )
}

export default LoginForm