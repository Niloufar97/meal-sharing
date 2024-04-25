import useSWR from "swr";
import React, { useState } from "react";
import MealItem from "./MealItem.js";
import styles from "./meal.module.css";
import Filters from "./filters/Filters.js";

const fetcher = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data.data;
};

function MealList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState("")
  const [MealsTORender, setMealsToRender] = useState({
    availableReservation: false,
    allMeals: false,
  });
  const [openFilters, setOpenFilters] = useState(false);
  const urlGenrator = () => {
    if (searchQuery) {
      return `http://localhost:5000/api/meals?title=${searchQuery}`;
    } else if (MealsTORender.availableReservation) {
      return `http://localhost:5000/api/meals?availableReservations=true`;
    } else if (MealsTORender.allMeals) {
      return `http://localhost:5000/api/meals`;
    } else if (maxPrice) {
      return `api/meals?maxPrice=${maxPrice}`;
    } else {
      return "http://localhost:5000/api/meals";
    }
  };
  const shouldFetch = urlGenrator();
  const { data, error, isLoading } = useSWR(shouldFetch, fetcher);

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
        <button className={styles.filterBtn} type="button" onClick={() => setOpenFilters(true)}>
          Filters
        </button>
      </div>
      {openFilters ? (
          <Filters
            setOpenFilters={setOpenFilters}
            setMealsToRender={setMealsToRender}
            setMaxPrice={setMaxPrice}
          />
        ) : (
          ""
        )}
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
