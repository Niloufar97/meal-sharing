const express = require("express");
const router = express.Router();
const knex = require("../database");

router.get("/", async (request, response) => {
  try {
    const allMeals = await knex("Meal").select();
    response.json(allMeals);
  } catch (error) {
    throw error;
  }
});

router.post("/" , async(req, res) => {
 try{
  const { title, description, location, _when, max_reservations, price, created_date } = req.body;

  const newMeal = await knex("Meal").insert({
    title,
    description,
    location,
    _when,
    max_reservations,
    price,
    created_date
  })
  res.status(201).json({data: newMeal[0] , message: "ok"})
 }catch(err){
  console.error("Error adding meal:", err);
  res.status(500).json({ error: "Failed to add meal" });
 } 
});

module.exports = router;
