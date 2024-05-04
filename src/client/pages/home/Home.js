import React from "react";
import styles from "./home.module.css";

import { Link } from "react-router-dom/cjs/react-router-dom.min.js";

function Home() {
  return (
    <div className={styles.Containter}>
      {/* <div className={styles.backgroundImg}> */}
      <div className={styles.videoBackground}>
        <video autoPlay muted>
          <source src="src\client\assets\videos\home.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className={styles.overlay}></div>
        <div className={styles.content}>
          <h1>Welcome to Meal-Sharing </h1>
          <p>Here you can eat, drink & enjoy sharing food with others</p>
          <button>
            <Link className={styles.myLink} to="/meals">
              Meals
            </Link>
          </button>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

export default Home;
