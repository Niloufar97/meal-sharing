const express = require("express");
const router = express.Router();
const knex = require("../database");

// Returns all meals
router.get("/", async (request, response) => {
  try {
    const allMeals = await knex("Meal").select();
    response.json(allMeals);
  } catch (error) {
    throw error;
  }
});

// 	Adds a new meal to the database
router.post("/", async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      _when,
      max_reservations,
      price,
      created_date,
    } = req.body;

    const newMeal = await knex("Meal").insert({
      title,
      description,
      location,
      _when,
      max_reservations,
      price,
      created_date,
    });
    res.status(201).json({ message: "new meal added" });
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
    if (selectedMeal.length === 0) {
      return res.status(404).json({ data: null, message: "not found" });
    }
    res.status(200).json({ data: selectedMeal, message: "ok" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});



module.exports = router;
