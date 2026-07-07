import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './LoginForm.module.css'

const LoginForm = ({ currentUser, onLogin }) => {
  const navigate = useNavigate()
  const [username, setUsername] = useState(currentUser?.username || '')
  const [password, setPassword] = useState('')
  const [statusMessage, setStatusMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    const result = await onLogin({ username, password })
    setStatusMessage(result.message)
    setIsSubmitting(false)

    if (result.ok) {
      setPassword('')
      navigate('/order')
    }
  }

  const handleCancel = () => {
    setUsername(currentUser?.username || '')
    setPassword('')
    setStatusMessage('')
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
          <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Submit'}
          </button>
          <button type="button" className={styles.cancelButton} onClick={handleCancel}>
            Cancel
          </button>
        </div>

        {statusMessage ? <p className={styles.statusMessage}>{statusMessage}</p> : null}
      </form>
    </section>
  )
}

export default LoginForm