import { useRef, useState } from "react";

import AddIngredient from "./AddIngredient.jsx";
import AddInstruction from "./AddInstruction.jsx";
import AddNutrition from "./AddNutrition.jsx";

import plus from "../assets/iconmonstr-x-mark-lined.svg";

function NewRecipe() {
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([
    { subtitle: "", instruction: "" },
  ]);

  const titleRef = useRef();
  const descriptionRef = useRef();
  const servingsRef = useRef();
  const nutritionRefs = {
    calories: useRef(),
    protein: useRef(),
    fat: useRef(),
    carbohydrates: useRef(),
    fiber: useRef(),
    sodium: useRef(),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRecipe = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      picture: fileName,
      servings: servingsRef.current.value,
      ingredients,
      instructions,
      nutrition: {
        calories: nutritionRefs.calories.current.value,
        protein: nutritionRefs.protein.current.value,
        fat: nutritionRefs.fat.current.value,
        carbohydrates: nutritionRefs.carbohydrates.current.value,
        fiber: nutritionRefs.fiber.current.value,
        sodium: nutritionRefs.sodium.current.value,
      },
      createdAt: new Date().toISOString(),
    };
    try {
      const res = await fetch("http://localhost:3001/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecipe),
      });
      if (!res.ok) throw new Error("Failed to add recipe");

      const result = await res.json();
      console.log("Recipe saved:", result);

      clearForm();
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  const clearForm = () => {
    titleRef.current.value = "";
    descriptionRef.current.value = "";
    servingsRef.current.value = "";
    setFileName("");

    setIngredients([""]);
    setInstructions([{ subtitle: "", instruction: "" }]);

    Object.values(nutritionRefs).forEach((ref) => {
      if (ref.current) ref.current.value = "";
    });
  };

  const textareaRef = useRef(null);

  const handleInput = () => {
    const textarea = descriptionRef.current;
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
          <form
            action=""
            className="pt-24 flex flex-col gap-20"
            onSubmit={handleSubmit}
          >
            <div className="newRecipeEl">
              <label htmlFor="title" className="newRecipeSubtitle">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Your title"
                ref={titleRef}
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
                ref={descriptionRef}
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
                    ref={servingsRef}
                    className="w-auto noBox  max-w-[2ch] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    placeholder="..."
                    min="0"
                  />
                  <label htmlFor="servings">servings</label>
                </div>
                <div className="flex flex-col gap-4">
                  {ingredients.map((ingredient, index) => (
                    <AddIngredient
                      key={index}
                      value={ingredient}
                      onChange={(e) => {
                        const newIngredients = [...ingredients];
                        newIngredients[index] = e.target.value;
                        setIngredients(newIngredients);
                      }}
                      onRemove={() => {
                        setIngredients((prev) =>
                          prev.filter((_, i) => i !== index)
                        );
                      }}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  className="pt-9"
                  onClick={() => setIngredients([...ingredients, ""])}
                >
                  <img
                    src={plus}
                    alt="Add ingredient"
                    className="h-4 w-4 rotate-45 hover:cursor-pointer"
                  />
                </button>
              </div>
            </div>
            <div className="newRecipeEl2">
              <p className="newRecipeSubtitle">Instruction</p>
              <div className="col-start-2 col-span-1">
                <div className="flex flex-col gap-10">
                  {instructions.map((step, index) => (
                    <AddInstruction
                      key={index}
                      subtitle={step.subtitle}
                      instruction={step.instruction}
                      onChange={(field, value) => {
                        const updated = [...instructions];
                        updated[index][field] = value;
                        setInstructions(updated);
                      }}
                      onRemove={() => {
                        setInstructions((prev) =>
                          prev.filter((_, i) => i !== index)
                        );
                      }}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  className="pt-9"
                  onClick={() =>
                    setInstructions([
                      ...instructions,
                      { subtitle: "", instruction: "" },
                    ])
                  }
                >
                  <img
                    src={plus}
                    alt="Add instruction"
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
                <AddNutrition
                  id="calories"
                  label="Calories"
                  unit="kcal"
                  inputRef={nutritionRefs.calories}
                />
                <AddNutrition
                  id="protein"
                  label="Protein"
                  unit="g"
                  inputRef={nutritionRefs.protein}
                />
                <AddNutrition
                  id="fat"
                  label="Fat"
                  unit="g"
                  inputRef={nutritionRefs.fat}
                />
                <AddNutrition
                  id="carbohydrates"
                  label="Carbohydrates"
                  unit="g"
                  inputRef={nutritionRefs.carbohydrates}
                />
                <AddNutrition
                  id="fiber"
                  label="Fiber"
                  unit="g"
                  inputRef={nutritionRefs.fiber}
                />
                <AddNutrition
                  id="sodium"
                  label="Sodium"
                  unit="mg"
                  inputRef={nutritionRefs.sodium}
                />
              </div>
            </div>
            <div className="flex flex-col items-end gap-9">
              <button
                type="button"
                className="text-2xl font-light text-darkGrey hover:cursor-pointer"
                onClick={clearForm}
              >
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
