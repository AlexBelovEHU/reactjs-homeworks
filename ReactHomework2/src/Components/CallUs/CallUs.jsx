import React from 'react'
import styles from './CallUs.module.css'

export default function CallUs() {
  return (
    <div className={styles.callWrap} aria-hidden="false">
      <button className={styles.callButton} type="button" aria-describedby="call-tooltip">
        <span className={styles.phoneIcon} aria-hidden="true">📞</span>
      </button>

      <div id="call-tooltip" role="tooltip" className={styles.tooltip}>
        +1234567890
      </div>
    </div>
  )
}
