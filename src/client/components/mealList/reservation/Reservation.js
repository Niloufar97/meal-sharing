import React, { useState } from 'react'
import useSWR from 'swr'
import styles from './reservation.module.css'
import ReservationForm from './ReservationForm.js'


const fetcher = (url) => {
    return fetch(url).then(res => res.json())
}

function Reservation({id}) {
    const {data , error, isLoading} = useSWR(`http://localhost:5000/api/meals/${id}/available`, fetcher);
    const [popup , setPopup] = useState(false);

    const togglePopup = () => {
        setPopup(true)
    }

    if(error) return <p>{error}</p>
    if(isLoading) return <p>Loading...</p>
    
  return (
    <>
        <div>
            <p>Max-Reservation: {data.data[0].max_reservations}</p>
        </div>
        <div className={styles.availableDiv}>
            <p>Available : {data.data[0].available_reservations}</p>
            {data.data[0].available_reservations > 0 ? (
                <button
                    onClick={togglePopup}
                >RESERVE NOW</button>
            ) : (
                <p className={styles.soldOut}>Sold out</p>
            )}
        </div>
        {popup ? (<ReservationForm id={id} setPopup={setPopup}/>) : ""}
    </>
  )
}

export default Reservation
