import RecipeIngredient from "./RecipeIngredient.jsx";
import RecipeInstruction from "./RecipeInstruction.jsx";
import RecipeNutrition from "./RecipeNutrition.jsx";
import eggFriedRice from "../assets/egg-fried-rice-main-preview.webp";

function Recipe() {
  return (
    <>
      <div className="mx-10">
        <div className="mt-52">
          <div className="grid grid-cols-[7fr_5fr] gap-22">
            <img src={eggFriedRice} alt="" />
            <div className="flex flex-col h-full">
              <p className="text-base font-light text-darkGrey pb-3">
                Cédric's
              </p>
              <h1 className="text-5xl pb-10">Stir Fried Rice</h1>
              <p className="text-xl">
                Stir-Fried Rice with Eggs and Vegetables is a quick, wholesome,
                and versatile dish rooted in Asian culinary traditions. Made
                using day-old rice for optimal texture, this dish combines
                fluffy scrambled eggs, vibrant vegetables, and a savory touch of
                soy sauce to create a well-balanced and satisfying meal. It's a
                great way to use up leftover rice and fridge veggies, making it
                both budget-friendly and nutritious. Whether enjoyed as a main
                course or a side dish, this stir-fry delivers flavor, color, and
                comfort in every bite.
              </p>
              <div className="font-light mt-auto">
                <p className="text-darkGrey justify-self-end underline pb-6">
                  Per 100g
                </p>
                <ul>
                  <RecipeNutrition type="Calories" quantity="145kcal" />
                  <RecipeNutrition type="Protein" quantity="4.2g" />
                  <RecipeNutrition type="Fat" quantity="5.5g" />
                  <RecipeNutrition type="Carbohydrates" quantity="19.8g" />
                  <RecipeNutrition type="Fiber" quantity="1.1g" />
                  <RecipeNutrition type="Sodium" quantity="410mg" />
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-30 pt-16 border-t gap-32">
          <div className="grid grid-cols-[1fr_5fr_5fr_1fr]">
            <div className="col-start-2 flex flex-col gap-3 ">
              <h2 className="text-2xl font-medium">Ingredients :</h2>
              <p className="text-lg text-darkGrey font-light">For 2 servings</p>
            </div>
            <ul className="col-start-3 leading-12">
              <RecipeIngredient ingredient="300 g cooked white rice (cold, ideally day-old)" />
              <RecipeIngredient ingredient="2 large eggs (approx. 110 g total)" />
              <RecipeIngredient ingredient="130 g mixed vegetables (e.g. carrots, peas, bell pepper, corn)" />
              <RecipeIngredient ingredient="30 g green onions (about 2 stalks), chopped" />
              <RecipeIngredient ingredient="6 g garlic (about 2 cloves), minced" />
              <RecipeIngredient ingredient="30 mL soy sauce (2 tablespoons)" />
              <RecipeIngredient ingredient="15 mL vegetable oil (1 tablespoon)" />
              <RecipeIngredient ingredient="Salt and pepper to taste" />
              <RecipeIngredient
                ingredient="Optional : A few drops of sesame oil, chili flakes, or sesame
                seeds for garnish"
              />
            </ul>
          </div>
          <div className="grid grid-cols-[1fr_5fr_5fr_1fr]">
            <div className="col-start-2">
              <h2 className="text-2xl font-medium">Instructions :</h2>
            </div>
            <div className="col-start-3">
              <ol className="flex flex-col gap-16">
                <RecipeInstruction
                  subtitle="Prepare the ingredients"
                  instruction="Beat the eggs in a bowl. Dice or thaw vegetables as needed.
                    Use cold rice and break up clumps with your hands or a fork."
                />
                <RecipeInstruction
                  subtitle="Scramble the eggs"
                  instruction="Heat 1 tsp of the oil in a large skillet or wok over medium
                    heat. Pour in the eggs, scramble gently until just cooked,
                    then transfer to a plate."
                />
                <RecipeInstruction
                  subtitle="Cook the vegetables"
                  instruction="Add the remaining oil to the pan. Stir-fry garlic for 30
                    seconds, then add the mixed vegetables. Cook for 3–4 minutes
                    until tender."
                />
                <RecipeInstruction
                  subtitle="Stir fry and season"
                  instruction="Return the scrambled eggs to the pan. Pour in soy sauce and
                    add green onions. Stir-fry everything for 1–2 more minutes.
                    Season with salt and pepper to taste."
                />
                <RecipeInstruction
                  subtitle="Serve"
                  instruction="Serve hot, garnished with optional sesame seeds or a drizzle
                    of sesame oil."
                />
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Recipe;
