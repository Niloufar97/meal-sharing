import knex from "../../database.js";

export async function getMealsUnderMaxPrice(maxPrice, response) {
  const mealsUnderMaxPrice = await knex("meal").where("price", "<", maxPrice);
  response.data = mealsUnderMaxPrice;
  response.status = 200;
  response.message = "ok";
};

export async function getAvailableReservations(
  availableReservations,
  response
) {
  if (availableReservations === "true") {
    const availableMeals = await knex("meal")
    .select(
      "meal.meal_id",
      "meal.title",
      "meal.img",
      "meal.price",
      knex.raw("COALESCE(SUM(number_of_guests), 0) AS total_guests"),
      "max_reservations"
    )
    .leftJoin("reservation", "meal.meal_id", "=", "reservation.meal_id")
    .groupBy("meal.meal_id")
    .havingRaw(
      "COALESCE(SUM(number_of_guests), 0) < max_reservations OR COUNT(reservation.meal_id) = 0"
    );
  response.data = availableMeals;
  response.status = 200;
  response.message = "ok";
  }
  if (availableReservations === "false") {
    const unavilableMeals = await knex("meal")
      .select(
        "meal.meal_id",
        "meal.title",
        knex.raw("SUM(number_of_guests) AS total_guests"),
        "max_reservations"
      )
      .leftJoin("reservation", "meal.meal_id", "=", "reservation.meal_id")
      .groupBy("meal.meal_id")
      .havingRaw("SUM(number_of_guests) = max_reservations");
    response.data = unavilableMeals;
    response.status = 200;
    response.message = "ok";
  }
};

export async function getMealWithTitle(title, response) {
  const mealWithTitle = await knex("meal")
    .select("*")
    .where("title", "like", `%${title}%`);
  response.data = mealWithTitle;
  response.status = 200;
  response.message = "ok";
};

export async function getMealAfterDate(dateAfter, response) {
  const mealAfterDate = await knex("meal")
    .select("*")
    .where("_when", ">", dateAfter);
  response.data = mealAfterDate;
  response.status = 200;
  response.message = "ok";
};

export async function getMealBeforeDate(beforeDate, response) {
  const mealBeforeDate = await knex("meal")
    .select("*")
    .where("_when", "<", beforeDate);
  response.data = mealBeforeDate;
  response.status = 200;
  response.message = "ok";
};

export async function getLimitedMeals(limit, response) {
  const limitedMeals = await knex("meal")
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
    const sortedMeals = await knex('meal')
        .select('*')
        .orderBy(sortKey , sortDirection);
    response.data = sortedMeals;
    response.status = 200;
    response.message = "ok";
};