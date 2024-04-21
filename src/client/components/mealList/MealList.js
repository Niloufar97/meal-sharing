import useSWR from "swr";
import React, { useState } from "react";
import MealItem from "./MealItem.js";
import styles from "./meal.module.css";

const fetcher = async (url) => {
  const response = await fetch(url);
  const data = await response.json()
  return data.data
};

function MealList() {
  const [searchQuery, setSearchQuery] = useState("");
  const shouldFetch = searchQuery?  `http://localhost:5000/api/meals?title=${searchQuery}` :'http://localhost:5000/api/meals'
  const { data, error, isLoading } = useSWR(
    shouldFetch,
    fetcher
  );


  if (error) return <div>Error in fetching data</div>;

  return (
    <div className={styles.MealListComp}>
      <div className={styles.searchAndFilter}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          ></input>
        
        </div>
      </div>
      {isLoading && <p>Loading...</p>}
      <div className={styles["meal-container"]}>
        {data?.map((meal) => (
          <MealItem key={meal.meal_id} meal={meal} />
        ))}
      </div>
    </div>
  );
}

export default MealList;
