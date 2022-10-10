import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const url = "/api/v1/recipes/index";
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setRecipes(response))
      .catch(() => this.props.history.push("/"));
  }, []);

  const allRecipes = recipes.map((recipe, index) => (
    <div
      key={index}
      className="flex font-sans mb-4 bg-slate-100 rounded-lg inline-flex"
    >
      <div className="flex-none w-48 relative">
        <img
          src={recipe.image}
          className="absolute inset-0 w-full h-full object-cover rounded-lg"
          loading="lazy"
        />
      </div>
      <div className="flex-auto p-6">
        <div className="flex flex-wrap mb-2">
          <h1 className="flex-auto text-lg font-semibold text-slate-900">
            {recipe.name}
          </h1>
        </div>
        <p className="text-sm text-slate-700">{recipe.instruction}</p>
        <div className="flex space-x-4 mt-4 text-sm font-medium">
          <div className="flex-auto flex space-x-4">
            <Link to={`/recipe/${recipe.id}`}>
              <button
                className="h-6 px-6 font-semibold rounded-md bg-black text-white hover:bg-blue-400"
                type="submit"
              >
                Show
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  ));
  const noRecipe = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        No recipes yet. Why not <Link to="/new_recipe">create one</Link>
      </h4>
    </div>
  );

  return (
    <>
      <section className="container mx-auto text-center bg-slate-100 mb-4 rounded-lg">
        <div className="container py-5">
          <h1 className="display-4">Recipes for every occasion</h1>
          <p className="lead text-muted">
            We’ve pulled together our most popular recipes, our latest
            additions, and our editor’s picks, so there’s sure to be something
            tempting for you to try.
          </p>
        </div>
        <Link
          to="/recipe"
          className="p-3 bg-blue-400 inline-block m-2 text-white rounded-md hover:bg-blue-300"
        >
          Create New Recipe
          <p>+</p>
        </Link>
      </section>

      <div className="container columns-3 mx-auto">
        {recipes.length > 0 ? allRecipes : noRecipe}
      </div>
    </>
  );
}
