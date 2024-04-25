import React from "react";
import styles from "./filters.module.css";

function Filters({ setMealsToRender ,setOpenFilters}) {
  return (
    <div className={styles.overlay}>
      <div className={styles.sidebar}>
            <button type="button" className={styles.closeBtn} onClick={()=>{setOpenFilters(false)}}>
                X
            </button>
        <div className={styles.sidebarContainer}>
          <button
            type="button"
            onClick={() => {
              setMealsToRender({
                availableReservation: false,
                allMeals: true,
                max_price: false,
              });
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
                max_price: false,
              });
            }}
          >
            Available
          </button>
          <button
            type="button"
            onClick={() => {
              setMealsToRender({
                availableReservation: false,
                allMeals: false,
                max_price: true,
              });
            }}
          >
            Expensive
          </button>
        </div>
      </div>
    </div>
  );
}

export default Filters;
