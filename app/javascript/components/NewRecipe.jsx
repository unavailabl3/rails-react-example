import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewRecipe() {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instruction, setInstruction] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const url = "/api/v1/recipes/create";
    if (name.length == 0 || ingredients.length == 0 || instruction.length == 0)
      return;
    const body = {
      name: name,
      ingredients: ingredients,
      instruction: instruction.replace(/\n/g, "<br> <br>"),
    };
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => {
        navigate(`/recipe/${response.id}`);
      })
      .catch(error => console.log(error.message));
  }

  return (
    <section
      className="py-20 px-4 lg:px-16 overflow-hidden relative z-10 bg-slate-50"
      data-aos="fade-up"
      id="contact"
    >
      <div className="container">
        <div className="mb-5 flex items-center max-w-md">
          <h2 className="text-slate-900 dark:text-gray-200 text-3xl font-bold">
            New Recipe
          </h2>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center text-slate-900 dark:text-gray-200 lg:justify-between -mx-4">
          <div
            className="w-full lg:w-1/2 xl:w-6/12 px-4"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="max-w-[570px] mb-12 lg:mb-0">
              <p className="text-base text-4xl font-extrabold text-body-color leading-relaxed stand__out__text mb-9 mx-5">
                Your new awesome recipe. Share it with others.
              </p>
              <p className="text-base text-2xl font-medium text-body-color leading-relaxed mb-9 mx-5">
                Provide
                <span className="font-bold font-bold italic"> name</span>,
                ingredients and instruction.
              </p>
            </div>
          </div>
          <div
            className="w-full lg:w-1/2 xl:w-5/12 px-4"
            data-aos="fade-up"
            data-aos-delay="500"
            data-aos-duration="2000"
          >
            <div className="bg-gray-100 dark:bg-slate-800 relative rounded-lg p-8 sm:p-12 shadow-lg">
              <form>
                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="Recipe Name"
                    className="
                                    w-full
                                    rounded
                                    p-3
                                    text-gray-800
                                    dark:text-gray-50
                                    dark:bg-slate-700
                                    border-gray-500
                                    dark:border-slate-600
                                    outline-none
                                    focus-visible:shadow-none
                                    focus:border-primary
                                    "
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="Recipe Ingredients"
                    className="
                                    w-full
                                    rounded
                                    p-3
                                    text-gray-800
                                    dark:text-gray-50
                                    dark:bg-slate-700
                                    border-gray-500
                                    dark:border-slate-600
                                    outline-none
                                    focus-visible:shadow-none
                                    focus:border-primary
                                    "
                    name="ingredients"
                    onChange={(e) => setIngredients(e.target.value)}
                  />
                </div>
                <div className="mb-6">
                  <textarea
                    rows="6"
                    placeholder="Recipe Instruction"
                    className="
                                    w-full
                                    rounded
                                    p-3
                                    text-gray-800
                                    dark:text-gray-50
                                    dark:bg-slate-700
                                    border-gray-500
                                    dark:border-slate-600
                                    outline-none
                                    focus-visible:shadow-none
                                    focus:border-primary
                                    "
                    name="instruction"
                    onChange={(e) => setInstruction(e.target.value)}
                  ></textarea>
                </div>
                <div>
                  <button
                    type="button"
                    className=" w-full text-gray-100 bg-blue-400 rounded border border-primary dark:border-slate-600 p-3 transition ease-in-out hover:bg-blue-500"
                    onClick={onSubmitHandler}
                  >
                    Create Recipe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
