import React from "react";
import styles from './AddMealForm.module.css'
import { useState } from "react";

const AddMealForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    _when: "",
    max_reservations: "",
    created_date: new Date(),
    price: "",
    img: "",
  });
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/meals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
        }),
      });
      if (response.ok) {
        mutate("http://localhost:5000/api/meals");
        setPopup(false);
        alert("Food added successfully");

        setFormData({
          title: "",
          description: "",
          location: "",
          _when: "",
          max_reservations: "",
          created_date: "",
          price: "",
          img: "",
        });
      }
    } catch (error) {
      console.log(error);
      alert("Failed to add reservation");
    }
  };
  return (
   
      <div className={styles.formContainer}>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            name="title"
            placeholder="Name"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          ></input>
          <textarea
            placeholder="Food Description"
            name="description"
            rows="4"
            cols="35"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={(e) =>
              setFormData({
                ...formData,
                location: e.target.value,
              })
            }
          ></input>
          <input
            type="date"
            name="_when"
            placeholder="When"
            value={formData._when}
            onChange={(e) =>
              setFormData({
                ...formData,
                _when: e.target.value
              })
            }
          ></input>
         
          <input
            type="number"
            name="max_reservations"
            placeholder="Max Reservations"
            value={formData.max_reservations}
            onChange={(e) =>
              setFormData({
                ...formData,
                max_reservations: Number(e.target.value),
              })
            }
          ></input>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={(e) =>
              setFormData({
                ...formData,
                price: Number(e.target.value),
              })
            }
          ></input>
           <input
            type="text"
            name="img"
            placeholder="Image URL"
            value={formData.img}
            onChange={(e) =>
              setFormData({
                ...formData,
                img: e.target.value,
              })
            }
          ></input>
          <button type="submit">Share Meal</button>
        </form>
      </div>
   
  );
};

export default AddMealForm;
