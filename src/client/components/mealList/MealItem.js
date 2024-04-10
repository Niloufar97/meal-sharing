import React from "react";
import styles from "./meal.module.css";

function MealItem({ meal }) {
  return (
    <div className={styles["meal-card"]}>
      <div className={styles["image-container"]}>
        <img src={meal.img} alt={meal.title} />
      </div>
      <h2>{meal.title}</h2>
      <p>{meal.description}</p>
      <h6>Price: {meal.price}</h6>
    </div>
  );
}

export default MealItem;
