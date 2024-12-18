//dependencies
import React from 'react'

//styles
import styles from '../styles/Loader.module.css'

function Loader() {
  return (
    <div className={styles.container}>
        <div className={styles.wings}></div>
        <div className={styles.circle}></div>
        <div className={styles.arc}></div>
        <div className={styles.arc2}></div>
    </div>
  )
}

export default Loader