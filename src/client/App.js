import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TestComponent from "./components/TestComponent/TestComponent.js";
import MealList from "./components/mealList/MealList.js";
import Layout from "./components/layout/Layout.js";

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            <MealList />
          </Route>
          <Route exact path="/lol">
            <p>lol</p>
          </Route>
          <Route exact path="/test-component">
            <TestComponent></TestComponent>
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
