import { useRef, useState } from "react";

import AddIngredient from "./AddIngredient.jsx";
import AddInstruction from "./AddInstruction.jsx";
import AddNutrition from "./AddNutrition.jsx";

import plus from "../assets/iconmonstr-x-mark-lined.svg";

function NewRecipe() {
  const textareaRef = useRef(null);

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : "");
  };

  return (
    <>
      <div className="mt-53 mx-10 grid grid-cols-[1fr_9fr_1fr_1fr]">
        <div className="col-start-2 col-span-2">
          <div className="flex flex-row justify-between pb-9 border-b">
            <h1 className="text-6xl">New recipe</h1>
            <p className="text-2xl text-darkGrey">Cédric</p>
          </div>
          <form action="" className="pt-24 flex flex-col gap-20">
            <div className="newRecipeEl">
              <label htmlFor="title" className="newRecipeSubtitle">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Your title"
                className="text-xl  placeholder:italic placeholder:font-light noBox"
              />
            </div>
            <div className="newRecipeEl">
              <label htmlFor="description" className="newRecipeSubtitle">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                placeholder="Your description"
                className="text-lg  placeholder:italic placeholder:font-light noBox resize-none"
                ref={textareaRef}
                onInput={handleInput}
                rows={1}
              ></textarea>
            </div>
            <div className="newRecipeEl2">
              <label htmlFor="picture" className="newRecipeSubtitle">
                Picture
              </label>
              <input
                type="file"
                id="picture"
                name="picture"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="picture"
                className="italic underline hover:cursor-pointer"
              >
                {fileName || "Add a picture"}
              </label>
            </div>
            <div className="newRecipeEl2">
              <p className="newRecipeSubtitle">Ingredients</p>
              <div className="flex flex-col">
                <div className="flex flex-row text-lg text-darkGrey pb-11">
                  <input
                    type="number"
                    name="servings"
                    id="servings"
                    className="w-auto noBox  max-w-[2ch] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    placeholder="..."
                    min="0"
                  />
                  <label htmlFor="servings">servings</label>
                </div>
                <AddIngredient />
                <button className="pt-9">
                  <img
                    src={plus}
                    alt=""
                    className="h-4 w-4 rotate-45 hover:cursor-pointer"
                  />
                </button>
              </div>
            </div>
            <div className="newRecipeEl2">
              <p className="newRecipeSubtitle">Instruction</p>
              <div className="col-start-2 col-span-1">
                <AddInstruction />
                <button className="pt-9">
                  <img
                    src={plus}
                    alt=""
                    className="h-4 w-4 rotate-45 hover:cursor-pointer"
                  />
                </button>
              </div>
            </div>
            <div className="newRecipeEl3">
              <div>
                <p className="newRecipeSubtitle">Nutrition</p>
                <p className="text-lg text-darkGrey font-light">Per 100g</p>
              </div>
              <div className="w-full flex flex-col gap-9">
                <AddNutrition id="calories" label="Calories" unit="kcal" />
                <AddNutrition id="protein" label="Protein" unit="g" />
                <AddNutrition id="fat" label="Fat" unit="g" />
                <AddNutrition
                  id="carbohydrates"
                  label="Carbohydrates"
                  unit="g"
                />
                <AddNutrition id="fiber" label="Fiber" unit="g" />
                <AddNutrition id="sodium" label="Sodium" unit="mg" />
              </div>
            </div>
            <div className="flex flex-col items-end gap-9">
              <button className="text-2xl font-light text-darkGrey hover:cursor-pointer">
                Clear
              </button>
              <input
                type="submit"
                value="Create"
                className="text-3xl font-medium hover:cursor-pointer"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default NewRecipe;
