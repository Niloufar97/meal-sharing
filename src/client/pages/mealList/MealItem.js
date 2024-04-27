import React from "react";
import styles from "./meal.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min.js";

function MealItem({ meal }) {
  return (
    <div className={styles["meal-card"]}>
      <div className={styles["image-container"]}>
        <img src={meal.img} alt={meal.title} />
      </div>
      <Link to={`/meals/${meal.meal_id}`}className={styles.link}><h2>{meal.title}</h2></Link>
      <h6 className={styles["price"]}>Price: {meal.price} kr.</h6>
    </div>
  );
}

export default MealItem;
