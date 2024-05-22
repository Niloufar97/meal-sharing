import React, { useState } from 'react'
import useSWR from 'swr'
import styles from './reservation.module.css'
import ReservationForm from './ReservationForm.js'
import { useLocation } from "react-router-dom/cjs/react-router-dom.min.js";


const fetcher = (url) => {
    return fetch(url).then(res => res.json())
}

function Reservation({id}) {
    const location = useLocation();
    const currentUrl = location.pathname + location.search;

    let url = `${
        currentUrl.includes("localhost")
          ? "http://localhost:5000"
          : "https://meal-sharing-dhq2.onrender.com"
      }/api/meals/${id}/available`;

    const {data , error, isLoading} = useSWR(url, fetcher);
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
        {popup ? (<ReservationForm id={id} mealTitle={data.data[0].title} setPopup={setPopup}/>) : ""}
    </>
  )
}

export default Reservation
