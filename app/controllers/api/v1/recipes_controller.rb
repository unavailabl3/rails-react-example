class Api::V1::RecipesController < ApplicationController
  def index
    limit = params[:limit].present? ? params[:limit].to_i : 10
    recipes = Recipe.order(created_at: :desc).limit(limit)
    render json: recipes
  end

  def create
    recipe = Recipe.create!(recipe_params)
    if recipe
      render json: recipe
    else
      render json: recipe.errors
    end
  end

  def show
    if recipe
      render json: recipe
    else
      render json: recipe.errors
    end
  end

  def destroy
    if recipe.present?
      recipe.destroy
      render json: { message: 'Recipe deleted!'}
    else
      render json: { message: "Recipe not found" }
    end
  end

  private

  def recipe_params
    params.permit(:name, :image, :ingredients, :instruction)
  end

  def recipe
    @recipe ||= Recipe.find(params[:id])
  end
end
