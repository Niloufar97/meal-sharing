import React from "react";
import styles from "./filters.module.css";

function Filters({ setMealsToRender, setOpenFilters, setMaxPrice, setSortKey,setSortDir }) {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarContainer}>
        <button
          type="button"
          onClick={() => {
            setMealsToRender({
              availableReservation: false,
              allMeals: true,
              expensive: false,
              cheap: false,
            });
            setMaxPrice(null);
            setSortKey(null)
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
            setMaxPrice(null);
            setSortKey(null)
          }}
        >
          Available
        </button>
        <div class={styles.sortContainer}>
          <button
            type="button"
            onClick={() => {
              setMealsToRender({
                availableReservation: false,
                allMeals: false,
              });
              setMaxPrice(null);
              setSortKey('price')
              setSortDir('desc')
            }}
          >
            Expensive
          </button>
          <button
            type="button"
            onClick={() => {
              setMealsToRender({
                availableReservation: false,
                allMeals: false,
              });
              setMaxPrice(null);
              setSortKey('price')
              setSortDir('asc')
            }}
          >
            Cheap
          </button>
        </div>
        <input
          type="number"
          placeholder="Max Price..."
          onChange={(e) => {
            setMaxPrice(Number(e.target.value));
            setMealsToRender({
              availableReservation: false,
              allMeals: false,
            });
            setSortKey(null)
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
