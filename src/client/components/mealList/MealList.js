import useSWR from "swr";
import React from "react";

const fetcher = (url) => {
  return fetch(url).then((res) => res.json());
};

function MealList() {
  const { data, error } = useSWR("http://localhost:5000/all-meals", fetcher);
  if (!data) return <div>Loading...</div>;
  if (error) return <div>Error in fetching data</div>;
  
  return (
    <div>
      {data.map((meal) => (
        <p key={meal.id}>{meal.title}</p>
      ))}
    </div>
  );
}

export default MealList;
