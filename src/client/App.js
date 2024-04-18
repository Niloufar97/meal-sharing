import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TestComponent from "./components/TestComponent/TestComponent.js";
import MealList from "./components/mealList/MealList.js";
import Layout from "./components/layout/Layout.js";
import Home from "./components/home/Home.js";
import MealDetail from "./components/mealList/MealDetail.js";

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/meals">
            <MealList />
          </Route>
          <Route exact path="/meals/:id">
            <MealDetail />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
