import express from "express";
const router = express.Router();
import knex from "../database.js";
import joi from "joi";

const MealSchema = joi.object({
  title : joi.string().required(),
  description: joi.string(),
  location: joi.string().required(),
  _when : joi.date().iso().required(),
  max_reservations: joi.number().integer().min(1).required(),
  price: joi.number().min(0).required(),
  created_date : joi.date().iso()
});

// Returns all meals
router.get("/", async (request, response) => {
  try {
    const allMeals = await knex("Meal").select();
    response.json({allMeals});
  } catch (error) {
    throw error;
  }
});

// 	Adds a new meal to the database
router.post("/", async (req, res) => {
  try {
    const {error} = MealSchema.validate(req.body, { abortEarly: false });
    if(error){
      const errorMessages = error.details.map(detail => detail.message);
      return res.status(400).json({ errors: errorMessages });
    }

    await knex("Meal").insert(req.body);

    res.status(201).json({message: "new meal added successfully" });
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
    const {error} = MealSchema.validate(req.body , {abortEarly : false})
    if(error){
      const errorMessages = error.details.map(detail => detail.message);
      return res.status(400).json({errors : errorMessages})
    }
    const mealId = +req.params.id;

    const mealToUpdate = await knex("Meal")
      .where("meal_id", "=", mealId)
      .update(req.body);
    if(!mealToUpdate){
      return res.json({message : "There is no meal with this Id"})
    }
    res.status(200).json({ message: "meal updated"})
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Deletes the meal by id
router.delete("/:id" , async(req, res) => {
  try{
    const mealId = +req.params.id;
    const mealToDelete = await knex("Meal").where("meal_id" , "=" , mealId).del();

    if(!mealToDelete){
      return res.json({message : "There is no meal with this Id"})
    }
    res.status(200).json({message : "Meal deleted successfully"});
    
  }catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;