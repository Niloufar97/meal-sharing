import React from 'react'
import styles from './swiperContent.module.css'

function SwiperContent({data}) {
  return (
    <div className={styles.container}>
      <div className={styles.layout}>
      <div className={styles.imgContainer}>
        <img src={data.img}></img>
      </div>
      <div className={styles.textContainer}>
        <h2>{data.title}</h2>
        <p>{data.description}</p>
      </div>
      </div>
    </div>
  )
}

export default SwiperContent
