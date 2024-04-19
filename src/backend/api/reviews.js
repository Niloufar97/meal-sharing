import express from "express";
import knex from "../database.js";
import Joi from "joi";

const reviewSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  meal_id: Joi.number().integer(),
  stars: Joi.number().integer().min(1).required(),
  created_date: Joi.date().iso(),
});

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allReviews = await knex("Review").select("*");
    res.status(200).json({ data: allReviews, message: "ok" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const reviweID = +req.params.id;
    const review = await knex("Review")
      .select("*")
      .where("review_id", "=", reviweID);
    res.status(200).json({ data: review, message: "ok" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", async (req,res) => {
    try {
        const { error } = reviewSchema.validate(req.body, { abortEarly: false });
        if (error) {
          const errorMessages = error.details.map((detail) => detail.message);
          return res.status(400).json({ errors: errorMessages });
        }

        const mealId = req.body.meal_id
        const meal = await knex('Meal').select('*').where('meal_id', "=" , mealId);

        if(meal.length === 0){
            return res.json({message : "Can't add a review for non-existing meal"})
        }
        const mealReview = {
          ...req.body,
          created_date: new Date()
        }
        await knex("Review")
          .insert(mealReview)
    
       return res.status(200).json({ message: "Review added successfully" });
      } catch (err) {
        res.status(500).json({ message: "Internal server error" });
      }
});

router.put("/:id", async (req, res) => {
    try {
      const { error } = reviewSchema.validate(req.body, { abortEarly: false });
      if (error) {
        const errorMessages = error.details.map((detail) => detail.message);
        return res.status(400).json({ errors: errorMessages });
      }
  
      const reviewID = +req.params.id;
      const updatedCount = await knex("Review")
        .where("review_id", "=", reviewID)
        .update(req.body);
  
      if (updatedCount === 0) {
        return res.status(404).json({ message: `There is no review with id = ${reviewID}` });
      }
  
      return res.status(200).json({ message: "Review updated successfully" });
    } catch (err) {
      console.error(err); 
      res.status(500).json({ message: "Internal server error" });
    }
  });

router.delete("/:id", async (req, res) => {
  try {
    const reviweID = +req.params.id;
    await knex("Review").where("review_id", "=", reviweID).del();
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
