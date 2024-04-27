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
  const [maxPrice, setMaxPrice] = useState(null)
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc"); 
  const [MealsTORender, setMealsToRender] = useState({
    availableReservation: false,
    allMeals: false,
  });
  const [openFilters, setOpenFilters] = useState(false);

  const urlGenrator = () => {
    let url = "http://localhost:5000/api/meals"
    const params = new URLSearchParams()
  
    if (searchQuery) {
      params.append("title", searchQuery);
    }
    if (MealsTORender.availableReservation) {
      params.append("availableReservations", true);
    }
    if (maxPrice) {
      params.append("maxPrice", maxPrice);
    }
    if (sortKey) {
      params.append("sortKey", sortKey);
      params.append("sortDir", sortDir);
    }
  
    return `${url}?${params.toString()}`;
  }
  
  const shouldFetch = urlGenrator();
  const { data, error, isLoading } = useSWR(shouldFetch, fetcher);
  console.log(maxPrice)
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
            setSortKey={setSortKey}
            setSortDir={setSortDir}
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
