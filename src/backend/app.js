import express from "express";
import path from "path";
import mealsRouter from "./api/meals.js";
import reservationRouter from "./api/reservations.js";
import reviewsRouter from "./api/reviews.js";
import cors from "cors";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import knex from './database.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const buildPath = path.join(__dirname, "../../dist");
const app = express();
const router = express.Router();


// For week4 no need to look into this!
// Serve the built client html

app.use(express.static(buildPath));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(cors());

app.use("/api/meals", mealsRouter);
app.use("/api/reservations" , reservationRouter);
app.use("/api/reviews" , reviewsRouter);

// Respond with all meals in the future (relative to the when datetime)
app.get("/future-meals", async (req, res) => {
  try{
    const today = new Date();
    const futureMeals = await knex("Meal")
      .where("_when", ">", today)
      .select()
      if(futureMeals.length === 0){
        res.status(404).json({data: null , message : "No future meal available. chack later"});
        return
      }
      res.status(200).json({data : futureMeals , message: "ok"});
    }catch(err){
      console.error(err)
      res.status(500).json({data : null , message : "server error"});
    }
});

// Respond with all meals in the past (relative to the when datetime)
app.get("/past-meals", async (req, res) => {
  try{
    const today = new Date();
    const pastMeals = await knex("meal")
      .where("_when", "<", today)
      .select()
    
    if(pastMeals.length === 0) return res.status(404).json({data: null , message : "No past meals available"});
    res.status(404).json({data: pastMeals , message : "ok"});
  }catch(err){
    console.error(err)
    res.status(500).json({data : null , message : "server error"});
  }
});

//Respond with all meals sorted by ID
app.get("/all-meals", async (req, res) => {
  try {
    const allMeals = await knex("meal")
      .select()
      .orderBy('meal_id');
    
    res.status(200).json(allMeals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'server error' });
  }
});

// Respond with the first meal (meaning with the minimum id)
app.get("/first-meal" , async (req, res) => {
  try{
    const firstMeal = await knex("meal")
      .first()
  
    res.status(200).json({data:firstMeal , message: "ok"});

  }catch(err){
    console.error(error);
    res.status(500).json({ error: 'server error' });
  }
});

// Respond with the last meal (meaning with the maximum id)
app.get("/last-meal" , async (req, res) => {
  try{
    const lastMeal = await knex("meal")
     .orderBy("meal_id" , "desc")
     .first()

    res.status(200).json({data: lastMeal , message: "ok"})
  }catch(err){
    console.error(error);
    res.status(500).json({ error: 'server error' });
  }
});

if (process.env.API_PATH) {
  app.use(process.env.API_PATH, router);
} else {
  throw "API_PATH is not set. Remember to set it in your .env file";
}

// for the frontend. Will first be covered in the react class
app.use("*", (req, res) => {
  res.sendFile(path.join(`${buildPath}/index.html`));
});

export default app;
