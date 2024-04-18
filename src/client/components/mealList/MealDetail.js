import React, { useEffect, useState } from "react";
import styles from "./meal.module.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min.js";
import useSWR from "swr";

const fetcher = (url) => {
  return fetch(url).then((res) => res.json());
};

function formatDateTime(dateTimeString) {
    const options = { year: 'numeric', month: 'short', day: '2-digit', hour: 'numeric', minute: 'numeric' };
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleDateString('en-GB', options);
}

function MealDetail() {
  const { id } = useParams();
  const { data, error, isLoading } = useSWR(
    `http://localhost:5000/api/meals/${id}`,
    fetcher
  );
  if (error) return <p>{error}</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <div className={styles.mealDetailContainer}>
        <img src={data.data[0].img}></img>
        <div className={styles.detailText}>
          <h1 className={styles.mealTitle}>{data.data[0].title}</h1>
          <p>{data.data[0].description}</p>
          <p>When: {formatDateTime(data.data[0]._when)}</p>
          <div>Max-Reservation: {data.data[0].max_reservations}</div>
          <p>Price: {data.data[0].price}</p>
        </div>
      </div>
    </>
  );
}

export default MealDetail;
