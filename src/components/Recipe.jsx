import eggFriedRice from "../assets/egg-fried-rice-main-preview.webp";

function Recipe() {
  return (
    <>
      <div className="mx-[2.5rem]">
        <div className="mt-[13rem]">
          <div className="grid grid-cols-[7fr_5fr] gap-[5.5rem]">
            <img src={eggFriedRice} alt="" />
            <div className="flex flex-col h-full">
              <p className="text-[1rem] font-light text-darkGrey">Cédric's</p>
              <h1 className="text-[4rem]">Stir Fried Rice</h1>
              <p className="text-[1.25rem]">
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
              <div className="text-[1rem] font-light mt-auto">
                <p className="text-darkGrey justify-self-end underline">
                  Per 100g
                </p>
                <ul>
                  <li className="flex flex-row justify-between border-b py-[1.25rem] border-b-lightGrey">
                    <p className="text-darkGrey">Calories</p>
                    <p>145 kcal</p>
                  </li>
                  <li className="flex flex-row justify-between border-b py-[1.25rem] border-b-lightGrey">
                    <p className="text-darkGrey">Protein</p>
                    <p>4.2 g</p>
                  </li>
                  <li className="flex flex-row justify-between border-b py-[1.25rem] border-b-lightGrey">
                    <p className="text-darkGrey">Fat</p>
                    <p>5.5 g</p>
                  </li>
                  <li className="flex flex-row justify-between border-b py-[1.25rem] border-b-lightGrey">
                    <p className="text-darkGrey">Carbohydrates</p>
                    <p>19.8 g</p>
                  </li>
                  <li className="flex flex-row justify-between border-b py-[1.25rem] border-b-lightGrey">
                    <p className="text-darkGrey">Fiber</p>
                    <p>1.1 g</p>
                  </li>
                  <li className="flex flex-row justify-between border-b py-[1.25rem] border-b-lightGrey">
                    <p className="text-darkGrey">Sodium</p>
                    <p>410 mg</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-30 pt-16 border-t gap-32">
          <div className="grid grid-cols-[1fr_5fr_5fr_1fr]">
            <div className="col-start-2 flex flex-col gap-3 ">
              <h2 className="text-3xl font-medium">Ingredients :</h2>
              <p className="text-xl text-darkGrey font-light">For 2 servings</p>
            </div>
            <ul className="col-start-3 text-xl leading-12">
              <li>300 g cooked white rice (cold, ideally day-old)</li>
              <li>2 large eggs (approx. 110 g total)</li>
              <li>
                130 g mixed vegetables (e.g. carrots, peas, bell pepper, corn)
              </li>
              <li>30 g green onions (about 2 stalks), chopped</li>
              <li>6 g garlic (about 2 cloves), minced</li>
              <li>30 mL soy sauce (2 tablespoons)</li>
              <li>15 mL vegetable oil (1 tablespoon)</li>
              <li>Salt and pepper to taste</li>
              <li>
                Optional : A few drops of sesame oil, chili flakes, or sesame
                seeds for garnish
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-[1fr_5fr_5fr_1fr]">
            <div className="col-start-2">
              <h2 className="text-3xl font-medium">Instructions :</h2>
            </div>
            <div className="col-start-3 text-xl">
              <ol className="flex flex-col gap-16">
                <li className="flex flex-col gap-4">
                  <p className="italic text-darkGrey self-end">
                    Prepare the ingredients
                  </p>
                  <p>
                    Beat the eggs in a bowl. Dice or thaw vegetables as needed.
                    Use cold rice and break up clumps with your hands or a fork.
                  </p>
                </li>
                <li className="flex flex-col gap-4">
                  <p className="italic text-darkGrey self-end">
                    Scramble the eggs
                  </p>
                  <p>
                    Heat 1 tsp of the oil in a large skillet or wok over medium
                    heat. Pour in the eggs, scramble gently until just cooked,
                    then transfer to a plate.
                  </p>
                </li>
                <li className="flex flex-col gap-4">
                  <p className="italic text-darkGrey self-end">
                    Cook the vegetables
                  </p>
                  <p>
                    Add the remaining oil to the pan. Stir-fry garlic for 30
                    seconds, then add the mixed vegetables. Cook for 3–4 minutes
                    until tender.
                  </p>
                </li>
                <li className="flex flex-col gap-4">
                  <p className="italic text-darkGrey self-end">
                    Stir fry and season
                  </p>
                  <p>
                    Return the scrambled eggs to the pan. Pour in soy sauce and
                    add green onions. Stir-fry everything for 1–2 more minutes.
                    Season with salt and pepper to taste.
                  </p>
                </li>
                <li className="flex flex-col gap-4">
                  <p className="italic text-darkGrey self-end">Serve</p>
                  <p>
                    Serve hot, garnished with optional sesame seeds or a drizzle
                    of sesame oil.
                  </p>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Recipe;
