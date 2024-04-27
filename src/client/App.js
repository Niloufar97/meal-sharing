import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './pages/home/Home.js'
import MealList from './pages/mealList/MealList.js'
import MealDetail from './pages/mealList/MealDetail.js'
import Layout from "./components/layout/Layout.js";
import About from "./pages/about/About.js";



function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About/>
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
