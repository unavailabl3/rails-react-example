require 'rails_helper'

RSpec.describe "Api::V1::Recipes", type: :request do
  include CustomSpecHelper
  
  describe "GET /index" do
    it "returns http success" do
      get "/api/v1/recipes/index"

      expected_response = Recipe.order(created_at: :desc).limit(10).as_json
      expect(response).to have_http_status(:success)
      expect(json_response).to eq(expected_response)
    end
  end

  describe "GET /show" do
    it "returns http success" do
      new_recipe = Recipe.create(
        name: "new-name",
        ingredients: "ingredients",
        instruction: "instruction",
      )
      get "/api/v1/show/#{new_recipe.id}"

      expect(response).to have_http_status(:success)
      expect(json_response['name']).to eq(new_recipe.name)
    end
  end

  describe "DELETE /destroy" do
    it "returns http success" do
      last_recipe = Recipe.last
      delete "/api/v1/destroy/#{last_recipe.id}"

      expect(response).to have_http_status(:success)
      expect(json_response).to eq({ "message" => "Recipe deleted!" })
      expect(Recipe.exists?(last_recipe.id)).to eq(false)
    end
  end

end
