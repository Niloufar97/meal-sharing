import React from "react";
import styles from "./filters.module.css";

function Filters({ setMealsToRender, setOpenFilters,setMaxPrice }) {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarContainer}>
        <button
          type="button"
          onClick={() => {
            setMealsToRender({
              availableReservation: false,
              allMeals: true,
            });
            setOpenFilters(false)
          }}
        >
          All
        </button>
        <button
          type="button"
          onClick={() => {
            setMealsToRender({
              availableReservation: true,
              allMeals: false,
            });
            setOpenFilters(false)
          }}
        >
          Available
        </button>
        <input
          type="number"
          placeholder="Max Price..."
          onChange={(e) => {
           setMaxPrice(e.target.value)
          }}
        />
        <button
          type="button"
          className={styles.closeBtn}
          onClick={() => {
            setOpenFilters(false);
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Filters;
