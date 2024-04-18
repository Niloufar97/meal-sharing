import React from "react";
import styles from "./reservation.module.css";
import useSWR, { mutate } from "swr";
import { useState  } from "react";

function ReservationForm({ id, setPopup}) {
  const [formData, setFormData] = useState({
    contact_name: "",
    contact_email: "",
    contact_phonenumber: "",
    number_of_guests: "",
    meal_id: "",
    created_date: new Date(),
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/reservations", {
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
        mutate("http://localhost:5000/api/reservations");
        alert("reserved successfully");

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
        <button type="button" onClick={() => {setPopup(false)}}>close</button>
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
