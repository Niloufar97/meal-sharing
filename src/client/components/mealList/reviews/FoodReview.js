import React from "react";
import useSWR from "swr";
import styles from "./reviews.module.css";
import ReviewForm from "./ReviewForm.js";

const fetcher = (url) => {
  return fetch(url).then((res) => res.json());
};

function FoodReview({ id }) {
  const { data, error, isLoading } = useSWR(
    `http://localhost:5000/api/meals/${id}/reviews`,
    fetcher
  );

  const makeStars = (number) => {
    switch (number) {
      case 1:
        return "⭐";
      case 2:
        return "⭐⭐";
      case 3:
        return "⭐⭐⭐";
      case 4:
        return "⭐⭐⭐⭐";
      case 5:
        return "⭐⭐⭐⭐⭐";
    }
  };
  if (error) return <p>{error.message}</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className={data.data.length === 0 ? styles.reviewComp1 : styles.reviewComp}>
      {data.data.length === 0 ? (
        <h4 >No review for this food</h4>
      ) : (
        <div className={styles.reviewDiv}>
          {data.data.map((review) => (
            <div key={review.Meal_id} className={styles.singleReview}>
              <div className={styles.reviewHeader}>
                <p>{review.title}</p>
                <p>{makeStars(review.stars)}</p>
              </div>
              <p>{review.description}</p>
            </div>
          ))}
        </div>
      )}
      <section className={styles.reviewFormContainer}>
        <ReviewForm id={id}/>
      </section>
    </div>
  );
}

export default FoodReview;
