import express from "express";
const router = express.Router();
import knex from "../database.js";
import joi from "joi";
import {
  getMealsUnderMaxPrice,
  getAvailableReservations,
  getMealWithTitle,
  getMealAfterDate,
  getMealBeforeDate,
  getLimitedMeals,
  getSortedMeals,
} from "./controllers/mealsControllers.js";

const MealSchema = joi.object({
  title: joi.string().required(),
  description: joi.string(),
  location: joi.string().required(),
  _when: joi.date().iso().required(),
  max_reservations: joi.number().integer().min(1).required(),
  price: joi.number().min(0).required(),
  created_date: joi.date().iso(),
});

// Returns all meals
router.get("/", async (req, res) => {
  const {
    maxPrice,
    availableReservations,
    title,
    dateAfter,
    dateBefore,
    limit,
    sortKey,
    sortDir,
  } = req.query;

  try {
    let response = {
      data: [],
      status: 200,
      message: "ok",
    };

    if (maxPrice) await getMealsUnderMaxPrice(maxPrice, response);

    if (availableReservations)
      await getAvailableReservations(availableReservations, response);

    if (title) await getMealWithTitle(title, response);

    if (dateAfter) await getMealAfterDate(dateAfter, response);

    if (dateBefore) await getMealBeforeDate(dateBefore, response);

    if (limit) await getLimitedMeals(limit, response);

    if (sortKey) await getSortedMeals(sortKey, sortDir, response);

    if (Object.keys(req.query).length === 0) {
      const allMeals = await knex("Meal").select("*");
      response.data = allMeals;
    }

    res
      .status(response.status)
      .json({ data: response.data, message: response.message });
  } catch (error) {
    throw error;
  }
});

router.get("/:id/reviews", async (req, res) => {
  const mealId = +req.params.id;
  const reviwesForMeal = await knex("Review")
    .select("Review.title", "Review.description", "Meal.meal_id")
    .join("Meal", "Meal.meal_id", "=", "Review.meal_id")
    .where("Meal.meal_id", "=", mealId);

  res.status(200).json({ data: reviwesForMeal, message: "ok" });
});

router.get("/bestsellers", async (req, res) => {
  try {
    const bestsellers = await knex("Meal")
      .select("Meal.meal_id", "Meal.title", "Meal.description" , "Meal.img")
      .avg("Review.stars as Average_Stars")
      .join("Review", "Meal.meal_id", "=", "Review.meal_id")
      .groupBy("Meal.meal_id")
      .orderBy("Average_Stars", "desc")
      .limit(3);

    res.status(200).json({ data: bestsellers, message: "Top meals based on average stars" });
  } catch (error) {
    console.error('Error fetching bestseller meals:', error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/:id/available" , async(req, res) => {
  try{
    const id = +req.params.id
    const availableMeals = await knex('Meal')
    .select(
        "Meal.max_reservations",
        knex.raw("COALESCE(SUM(number_of_guests), 0) AS total_guests"),
        knex.raw("Meal.max_reservations - COALESCE(SUM(number_of_guests), 0) AS available_reservations")
    )
    .leftJoin("Reservation", "Meal.meal_id", "=", "Reservation.meal_id")
    .where("Meal.meal_id", id)
    .groupBy("Meal.meal_id")
    .havingRaw(
        "COALESCE(SUM(number_of_guests), 0) < max_reservations OR COUNT(Reservation.meal_id) = 0"
    );
    res.status(200).json({data: availableMeals , message:"ok"})
  }catch (error) {
    console.error('Error fetching bestseller meals:', error);
    res.status(500).json({ error: "Internal server error" });
  }
})

// 	Adds a new meal to the database
router.post("/", async (req, res) => {
  try {
    const { error } = MealSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({ errors: errorMessages });
    }

    await knex("Meal").insert(req.body);

    res.status(201).json({ message: "new meal added successfully" });
  } catch (err) {
    console.error("Error adding meal:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 	Returns the meal by id
router.get("/:id", async (req, res) => {
  try {
    const mealId = +req.params.id;
    const selectedMeal = await knex("Meal")
      .where("meal_id", "=", mealId)
      .select();
    res.status(200).json({ data: selectedMeal, message: "ok" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Updates the meal by id
router.put("/:id", async (req, res) => {
  try {
    const { error } = MealSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({ errors: errorMessages });
    }
    const mealId = +req.params.id;

    const mealToUpdate = await knex("Meal")
      .where("meal_id", "=", mealId)
      .update(req.body);
    if (!mealToUpdate) {
      return res.json({ message: "There is no meal with this Id" });
    }
    res.status(200).json({ message: "meal updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Deletes the meal by id
router.delete("/:id", async (req, res) => {
  try {
    const mealId = +req.params.id;
    const mealToDelete = await knex("Meal").where("meal_id", "=", mealId).del();

    if (!mealToDelete) {
      return res.json({ message: "There is no meal with this Id" });
    }
    res.status(200).json({ message: "Meal deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
