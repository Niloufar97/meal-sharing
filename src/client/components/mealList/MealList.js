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
  // const [availableReservation , setAvailableReservation] = useState(false)
  // const [allMeals, setAllMeals] = useState(false)
  const [MealsTORender, setMealsToRender] = useState({
    availableReservation: false,
    allMeals: false,
    max_price: false,
  });
  const [openFilters, setOpenFilters] = useState(false);
  const urlGenrator = () => {
    if (searchQuery) {
      return `http://localhost:5000/api/meals?title=${searchQuery}`;
    } else if (MealsTORender.availableReservation) {
      return `http://localhost:5000/api/meals?availableReservations=true`;
    } else if (MealsTORender.allMeals) {
      return `http://localhost:5000/api/meals`;
    } else if (MealsTORender.max_price) {
      return `api/meals?sortKey=price&sortDir=desc`;
    } else {
      return "http://localhost:5000/api/meals";
    }
  };
  const shouldFetch = urlGenrator();
  const { data, error, isLoading } = useSWR(shouldFetch, fetcher);

  if (error) return <div>Error in fetching data</div>;

  return (
    <div className={styles.MealListComp}>
      {openFilters ? (
        <Filters
          setOpenFilters={setOpenFilters}
          setMealsToRender={setMealsToRender}
        />
      ) : (
        ""
      )}
      <div className={styles.searchAndFilter}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          ></input>
        </div>
        <button type="button" onClick={() => setOpenFilters(true)}>
          Filters
        </button>
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
