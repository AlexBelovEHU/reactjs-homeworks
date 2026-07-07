import React from 'react'
import styles from './OrderPage.module.css'

const OrderPage = ({ currentUser }) => {
  return (
    <section className={styles.orderSection}>
      <div className={styles.orderCard}>
        <span className={styles.eyebrow}>Protected route</span>
        <h1 className={styles.title}>Order Page</h1>
        <p className={styles.description}>
          Welcome, {currentUser?.username}. This page is intentionally a placeholder for homework 6.
        </p>
      </div>
    </section>
  )
}

export default OrderPage