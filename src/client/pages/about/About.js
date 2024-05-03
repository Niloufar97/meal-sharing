import React from "react";
import styles from "./about.module.css";
import MySwiper from "../../components/swiper/MySwiper.js";
import AddMealForm from "../../components/hostMeal/AddMealForm.js";

function About() {
  return (
    <div className={styles.container}>
      <div className={styles.browseMeals}>
        <h3>Dive into a World of Homemade Delights</h3>
        <p>
          Craving a taste of home but tired of the takeout routine? We connect
          you with passionate home cooks in your community, offering a delicious
          escape from the ordinary. Browse our vibrant marketplace of homemade
          meals, brimming with hidden culinary gems and dishes bursting with
          love. Reserve your perfect bite and savor the authentic flavors that
          only come from a home kitchen.
        </p>
      </div>

      <div className={styles.swiperContainer}>
        <h2>OUR BEST FOODS</h2>
        <MySwiper />
      </div>

      <div className={styles.hostAMeal}>
        <h3>Ready to Share Your Culinary Passion?</h3>
        <p>
          Do you have a signature dish that wows your friends and family? Want
          to spread the joy of your cooking and earn a little extra on the side?
          We empower you to become a host on MealSharing! Simply add your
          creation to our ever-growing meal list, set your price, and share your
          culinary magic with the world. Click the link below to get started and
          become a part of our vibrant community of home cooks and food lovers!
        </p>

        <AddMealForm />
      </div>
    </div>
  );
}

export default About;
