import React from "react";
import styles from "./reservation.module.css";
import useSWR, { mutate } from "swr";
import { useState  } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min.js";

function ReservationForm({ id, setPopup, mealTitle}) {
  const [formData, setFormData] = useState({
    contact_name: "",
    contact_email: "",
    contact_phonenumber: "",
    number_of_guests: "",
    meal_id: "",
    created_date: new Date(),
  });

  const location = useLocation();
  const currentUrl = location.pathname + location.search;

  const url = `${
    currentUrl.includes("localhost")
      ? "http://localhost:5000"
      : "https://meal-sharing-dhq2.onrender.com"
  }/api/reservations`;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          meal_id: id,
        }),
      });
      if (response.ok) {
        mutate(url);
        setPopup(false)
        alert("Reserved successfully");

        console.log("Reservation added successfully");
       
        setFormData({
          contact_name: "",
          contact_email: "",
          contact_phonenumber: "",
          number_of_guests: "",
          meal_id: "", 
          created_date: ""
        });
      }
      
    } catch (error) {
      console.log(error);
      alert("Failed to add reservation");
    }
  };
  return (
    <div className={styles.formContainerOverlay}>
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <h2>{mealTitle}</h2>
          <button type="button" onClick={() => {setPopup(false)}}>close</button>
        </div>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            name="contact_name"
            placeholder="Name"
            value={formData.contact_name}
            onChange={(e) =>
              setFormData({ ...formData, contact_name: e.target.value })
            }
          ></input>
          <input
            type="email"
            name="contact_email"
            placeholder="Email"
            value={formData.contact_email}
            onChange={(e) =>
              setFormData({ ...formData, contact_email: e.target.value })
            }
          ></input>
          <input
            type="text"
            name="contact_phonenumber"
            placeholder="Phone Number"
            value={formData.contact_phonenumber}
            onChange={(e) =>
              setFormData({ ...formData, contact_phonenumber: e.target.value })
            }
          ></input>
          <input
            type="number"
            name="number_of_guests"
            placeholder="Number of gusts"
            value={formData.number_of_guests}
            onChange={(e) =>
              setFormData({ ...formData, number_of_guests: Number(e.target.value) })
            }
          ></input>
          <button type="submit">Reserve</button>
        </form>
      </div>
    </div>
  );
}

export default ReservationForm;
