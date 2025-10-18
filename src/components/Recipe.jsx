import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import RecipeIngredient from "./RecipeIngredient.jsx";
import RecipeInstruction from "./RecipeInstruction.jsx";
import RecipeNutrition from "./RecipeNutrition.jsx";

function Recipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [creator, setCreator] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipesAndCreator = async () => {
      try {
        const res = await fetch(`/api/recipes/${id}`);
        if (!res.ok) throw new Error("Failed to fetch recipes");
        const data = await res.json();
        setRecipe(data);

        const userRes = await fetch(`/api/users/${data.userId}`);
        if (!userRes.ok) throw new Error("Failed to fetch user");
        const userData = await userRes.json();
        setCreator(userData);
      } catch (err) {
        console.error("Error fetching recipes or creator:", err);
      }
    };

    if (id) fetchRecipesAndCreator();
  }, [id]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <>
      <div className="mx-10">
        <div className="mt-52">
          <div className="grid grid-cols-[7fr_5fr] gap-22">
            <img
              src={recipe.image || "/image/placeholder.png"}
              alt={recipe.title}
              className="w-full aspect-square object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/placeholder.png";
              }}
            />
            <div className="flex flex-col h-full">
              <p
                className="text-base font-light text-darkGrey pb-3 hover:underline hover:cursor-pointer decoration-inherit"
                onClick={() => navigate(`/profile/${recipe.userId}`)}
              >
                {creator ? `${creator.username}'s` : "User's"}
              </p>
              <h1 className="text-5xl pb-10">{recipe.title}</h1>
              <p className="text-xl">{recipe.description}</p>
              <div className="font-light mt-auto">
                <p className="text-darkGrey justify-self-end underline pb-6">
                  Per 100g
                </p>
                <ul>
                  <RecipeNutrition
                    type="Calories"
                    quantity={`${recipe.nutrition.calories}kcal`}
                  />
                  <RecipeNutrition
                    type="Protein"
                    quantity={`${recipe.nutrition.protein}g`}
                  />
                  <RecipeNutrition
                    type="Fat"
                    quantity={`${recipe.nutrition.fat}g`}
                  />
                  <RecipeNutrition
                    type="Carbohydrates"
                    quantity={`${recipe.nutrition.carbohydrates}g`}
                  />
                  <RecipeNutrition
                    type="Fiber"
                    quantity={`${recipe.nutrition.fiber}g`}
                  />
                  <RecipeNutrition
                    type="Sodium"
                    quantity={`${recipe.nutrition.sodium}mg`}
                  />
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-30 pt-16 border-t gap-32">
          <div className="grid grid-cols-[1fr_5fr_5fr_1fr]">
            <div className="col-start-2 flex flex-col gap-3 ">
              <h2 className="text-2xl font-medium">Ingredients :</h2>
              <p className="text-lg text-darkGrey font-light">
                For {recipe.servings} servings
              </p>
            </div>
            <ul className="col-start-3 leading-12">
              {recipe.ingredients.map((ingredient, index) => (
                <RecipeIngredient key={index} ingredient={ingredient} />
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-[1fr_5fr_5fr_1fr]">
            <div className="col-start-2">
              <h2 className="text-2xl font-medium">Instructions :</h2>
            </div>
            <div className="col-start-3">
              <ol className="flex flex-col gap-16">
                {recipe.instructions.map((step, index) => (
                  <RecipeInstruction
                    key={index}
                    subtitle={step.subtitle}
                    instruction={step.instruction}
                  />
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Recipe;
