import useSWR from "swr";
import React from "react";
import MealItem from "./MealItem.js";
import styles from './meal.module.css'

const fetcher = (url) => {
  return fetch(url).then((res) => res.json());
};


function MealList() {
  const { data, error, isLoading } = useSWR("http://localhost:5000/all-meals", fetcher);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error in fetching data</div>;
  
  return (
    <div className={styles["meal-container"]}>
      {data.map((meal) => (
        <MealItem key={meal.meal_id} meal={meal} />
      ))}
    </div>
  );
}

export default MealList;
