import React from "react";
import styles from "./reviews.module.css";
import useSWR, { mutate } from "swr";
import { useState } from "react";
function ReviewForm({ id }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    meal_id: "",
    stars: "",
  });
  const submitHander = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/reviews", {
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
        mutate("http://localhost:5000/api/reviews");
        alert("Review added successfully");
        setFormData({ title: "", description: "", meal_id: "", stars: "" });
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className={styles.reviewFormCom}>
      <h5>We would like to have your feedback</h5>
      <form onSubmit={submitHander}>
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        ></input>
        <input
          type="number"
          name="stars"
          placeholder="stars"
          min={1}
          max={5}
          onChange={(e) => setFormData({ ...formData, stars: e.target.value })}
        />
        <textarea
          placeholder="feedback"
          name="review"
          rows="4"
          cols="50"
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ReviewForm;
