import eggFriedRice from "../assets/egg-fried-rice-main-preview.webp";

function Recipe() {
  return (
    <>
      <body className="">
        <div className="mx-[2.5rem] mt-[13rem]">
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
      </body>
    </>
  );
}

export default Recipe;
