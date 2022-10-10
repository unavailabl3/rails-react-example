import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Recipe() {
  const { recipe_id } = useParams();
  const [recipe, setRecipe] = useState({});
  const navigate = useNavigate();

  const deleteRecipe = () => {
    const url = `/api/v1/destroy/${recipe_id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        alert(response.message);
        navigate("/recipes");
      })
      .catch(() => this.props.history.push("/recipes"));
  };

  useEffect(() => {
    const url = `/api/v1/show/${recipe_id}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setRecipe(response))
      .catch(() => this.props.history.push("/recipes"));
  }, []);

  const getRecipe = (
    <div className="mt-20">
      <div className="flex font-sans mb-4 bg-slate-100 rounded-lg mx-auto w-3/6">
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
          <br />
          <ul className="list-disc pl-5 text-md">
            {recipe.ingredients &&
              recipe.ingredients.split(", ").map((ingredient, index) => (
                <li key={index} className="text-slate-500">
                  {ingredient}
                </li>
              ))}
          </ul>
          <button
            className="h-6 px-6 font-semibold rounded-md bg-white text-red-400 hover:text-red-600 mt-5 float-right"
            type="submit"
            onClick={deleteRecipe}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  if (recipe?.id) {
    return getRecipe;
  } else {
    return;
  }
}
