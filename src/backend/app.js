const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");

const mealsRouter = require("./api/meals");
const buildPath = path.join(__dirname, "../../dist");
const port = process.env.PORT || 3000;
const cors = require("cors");
const knex = require("./database");

// For week4 no need to look into this!
// Serve the built client html
app.use(express.static(buildPath));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(cors());

router.use("/meals", mealsRouter);

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
      res.status(500).json({data : null , message : "An error"});
    }
});

// Respond with all meals in the past (relative to the when datetime)
app.get("/past-meals", async (req, res) => {
  try{
    const today = new Date();
    const pastMeals = await knex("Meal")
      .where("_when", "<", today)
      .select()
    
    if(pastMeals.length === 0) return res.status(404).json({data: null , message : "No past meals available"});
    res.status(404).json({data: pastMeals , message : "ok"});
  }catch(err){
    console.error(err)
    res.status(500).json({data : null , message : "An error occurred"});
  }
});

//Respond with all meals sorted by ID
app.get("/all-meals", async (req, res) => {
  try {
    const allMeals = await knex("Meal")
      .select()
      .orderBy('meal_id');
    
    res.status(200).json(allMeals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Respond with the first meal (meaning with the minimum id)
app.get("/first-meal" , async (req, res) => {
  try{
    const firstMeal = await knex("Meal")
      .first()
  
    res.status(200).json({data:firstMeal , message: "ok"});

  }catch(err){
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Respond with the last meal (meaning with the maximum id)
app.get("/last-meal" , async (req, res) => {
  try{
    const lastMeal = await knex("Meal")
     .orderBy("meal_id" , "desc")
     .first()

    res.status(200).json({data: lastMeal , message: "ok"})
  }catch(err){
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
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

module.exports = app;
