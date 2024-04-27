import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min.js";
const Header = () => {
    return (
        <header className="">
            <h1>Meal Sharing</h1>
            <nav>
                <NavLink to="/">
                    Home
                </NavLink>
                <NavLink to="/about">
                    About
                </NavLink>
                <NavLink to="/meals">
                    Meals
                </NavLink>
            </nav>
        </header>
    );
  };
  
  export default Header;