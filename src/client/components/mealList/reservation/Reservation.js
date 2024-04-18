import React from 'react'
import useSWR from 'swr'
import styles from './reservation.module.css'


const fetcher = (url) => {
    return fetch(url).then(res => res.json())
}

function Reservation({id}) {
    const {data , error, isLoading} = useSWR(`http://localhost:5000/api/meals/${id}/available`, fetcher);
    if(error) return <p>{error}</p>
    if(isLoading) return <p>Loading...</p>
    console.log(data)
  return (
    <>
        <div>
            <p>Max-Reservation: {data.data[0].max_reservations}</p>
        </div>
        <div className={styles.availableDiv}>
            <p>Available : {data.data[0].available_reservations}</p>
            {data.data[0].available_reservations > 0 ? (
                <button>RESERVE NOW</button>
            ) : (
                <p className={styles.soldOut}>Sold out</p>
            )}
        </div>
    </>
  )
}

export default Reservation
