import knex from "../../database.js";

export async function getMealsUnderMaxPrice(maxPrice, response) {
  const mealsUnderMaxPrice = await knex("Meal").where("price", "<", maxPrice);
  response.data = mealsUnderMaxPrice;
  response.status = 200;
  response.message = "ok";
};

export async function getAvailableReservations(
  availableReservations,
  response
) {
  if (availableReservations === "true") {
    const availableMeals = await knex("Meal")
      .select(
        "Meal.meal_id",
        "Meal.title",
        "Meal.img",
        "Meal.price",
        knex.raw("COALESCE(SUM(number_of_guests), 0) AS total_guests"),
        "max_reservations"
      )
      .join("Reservation", "Meal.meal_id", "=", "Reservation.meal_id")
      .groupBy("Meal.meal_id")
      .havingRaw(
        "COALESCE(SUM(number_of_guests), 0) < max_reservations OR COUNT(Reservation.meal_id) = 0"
      );
    response.data = availableMeals;
    response.status = 200;
    response.message = "ok";
  }
  if (availableReservations === "false") {
    const unavilableMeals = await knex("Meal")
      .select(
        "Meal.meal_id",
        "Meal.title",
        knex.raw("SUM(number_of_guests) AS total_guests"),
        "max_reservations"
      )
      .leftJoin("Reservation", "Meal.meal_id", "=", "Reservation.meal_id")
      .groupBy("Meal.meal_id")
      .havingRaw("SUM(number_of_guests) = max_reservations");
    response.data = unavilableMeals;
    response.status = 200;
    response.message = "ok";
  }
};

export async function getMealWithTitle(title, response) {
  const mealWithTitle = await knex("Meal")
    .select("*")
    .where("title", "like", `%${title}%`);
  response.data = mealWithTitle;
  response.status = 200;
  response.message = "ok";
};

export async function getMealAfterDate(dateAfter, response) {
  const mealAfterDate = await knex("Meal")
    .select("*")
    .where("_when", ">", dateAfter);
  response.data = mealAfterDate;
  response.status = 200;
  response.message = "ok";
};

export async function getMealBeforeDate(beforeDate, response) {
  const mealBeforeDate = await knex("Meal")
    .select("*")
    .where("_when", "<", beforeDate);
  response.data = mealBeforeDate;
  response.status = 200;
  response.message = "ok";
};

export async function getLimitedMeals(limit, response) {
  const limitedMeals = await knex("Meal")
    .select("*")
    .limit(limit);
  response.data = limitedMeals;
  response.status = 200;
  response.message = "ok";
};

export async function getSortedMeals(sortKey, sortDir, response){
    const validSortKeys = ["when", "max_reservations", "price"];
    const sortDirection = sortDir? sortDir : "asc"
    if(!validSortKeys.includes(sortKey)){
        response.data = null;
        response.status = 400;
        response.message = "Invalid sort key";
        return
    }
    const sortedMeals = await knex('Meal')
        .select('*')
        .orderBy(sortKey , sortDirection);
    response.data = sortedMeals;
    response.status = 200;
    response.message = "ok";
};