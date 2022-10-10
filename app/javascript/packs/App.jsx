import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import NewRecipe from "../components/NewRecipe";
import Recipe from "../components/Recipe";
import Recipes from "../components/Recipes";
import About from "../pages/About";

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipe/:recipe_id" element={<Recipe />} />
        <Route path="/recipe" element={<NewRecipe />} />
      </Routes>
    </div>
  );
}
