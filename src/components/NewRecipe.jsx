import { useAuth } from "../context/AuthContext.jsx";
import { useRef, useState, useEffect } from "react";

import AddIngredient from "./AddIngredient.jsx";
import AddInstruction from "./AddInstruction.jsx";
import AddNutrition from "./AddNutrition.jsx";

import plus from "../assets/iconmonstr-x-mark-lined.svg";

function NewRecipe() {
  const { token, user } = useAuth();

  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([
    { subtitle: "", instruction: "" },
  ]);
  const [fileName, setFileName] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);

  const titleRef = useRef();
  const descriptionRef = useRef();
  const servingsRef = useRef();
  const fileRef = useRef();
  const nutritionRefs = {
    calories: useRef(),
    protein: useRef(),
    fat: useRef(),
    carbohydrates: useRef(),
    fiber: useRef(),
    sodium: useRef(),
  };

  const [validationTrigger, setValidationTrigger] = useState(0);

  const validateForm = () => {
    requestAnimationFrame(() => {
      const hasTitle = titleRef.current?.value.trim() !== "";
      const hasDescription = descriptionRef.current?.value.trim() !== "";
      const hasServings = servingsRef.current?.value.trim() !== "";

      const hasImage = !!(
        fileRef.current?.files && fileRef.current.files.length > 0
      );

      const ingredientsFilled =
        ingredients.length > 0 && ingredients.every((ing) => ing.trim() !== "");
      const instructionsFilled =
        instructions.length > 0 &&
        instructions.every(
          (inst) =>
            inst.subtitle.trim() !== "" && inst.instruction.trim() !== ""
        );
      const nutritionFilled = Object.values(nutritionRefs).every(
        (ref) => ref.current?.value.trim() !== ""
      );

      const valid =
        hasTitle &&
        hasDescription &&
        hasServings &&
        hasImage &&
        ingredientsFilled &&
        instructionsFilled &&
        nutritionFilled;

      console.log("Validation Results:", {
        hasTitle,
        hasDescription,
        hasServings,
        hasImage,
        ingredientsFilled,
        instructionsFilled,
        nutritionFilled,
      });

      setCanSubmit(valid);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      const formData = new FormData();
      formData.append("title", titleRef.current.value);
      formData.append("description", descriptionRef.current.value);
      formData.append("servings", servingsRef.current.value);
      formData.append("image", fileRef.current?.files[0] || null);
      formData.append("ingredients", JSON.stringify(ingredients));
      formData.append("instructions", JSON.stringify(instructions));
      formData.append(
        "nutrition",
        JSON.stringify({
          calories: nutritionRefs.calories.current.value,
          protein: nutritionRefs.protein.current.value,
          fat: nutritionRefs.fat.current.value,
          carbohydrates: nutritionRefs.carbohydrates.current.value,
          fiber: nutritionRefs.fiber.current.value,
          sodium: nutritionRefs.sodium.current.value,
        })
      );

      const res = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
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
    if (fileRef) fileRef.current.value = "";
    setCanSubmit(false);
  };

  const handleInput = () => {
    const textarea = descriptionRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
    validateForm();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : "");
    validateForm();
  };

  useEffect(() => {
    console.log("Validation triggered");
    validateForm();
  }, [ingredients, instructions, fileName, validationTrigger]);

  const handleInputChange = () => setValidationTrigger((t) => t + 1);

  return (
    <>
      <div className="mt-53 mx-10 grid grid-cols-[1fr_9fr_1fr_1fr]">
        <div className="col-start-2 col-span-2">
          <div className="flex flex-row justify-between pb-9 border-b">
            <h1 className="text-6xl">New recipe</h1>
            <p className="text-2xl text-darkGrey">{user?.username || "User"}</p>
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
                onInput={() => {
                  validateForm();
                  handleInputChange();
                }}
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
                onInput={() => {
                  handleInput();
                  validateForm();
                  handleInputChange();
                }}
                rows={1}
              ></textarea>
            </div>
            <div className="newRecipeEl2">
              <label htmlFor="image" className="newRecipeSubtitle">
                Picture
              </label>
              <input
                type="file"
                id="image"
                name="image"
                ref={fileRef}
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="image"
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
                    required
                    onInput={() => {
                      validateForm();
                      handleInputChange();
                    }}
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
                        validateForm();
                        handleInputChange();
                      }}
                      onRemove={() => {
                        const newIngredients = ingredients.filter(
                          (_, i) => i !== index
                        );
                        setIngredients(newIngredients);
                        validateForm();
                        handleInputChange();
                      }}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  className="pt-9"
                  onClick={() => {
                    setIngredients([...ingredients, ""]);
                    validateForm();
                    handleInputChange();
                  }}
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
                        validateForm();
                        handleInputChange();
                      }}
                      onRemove={() => {
                        const updated = instructions.filter(
                          (_, i) => i !== index
                        );
                        setInstructions(updated);
                        validateForm();
                        handleInputChange();
                      }}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  className="pt-9"
                  onClick={() => {
                    setInstructions([
                      ...instructions,
                      { subtitle: "", instruction: "" },
                    ]);
                    validateForm();
                    handleInputChange();
                  }}
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
                  onInput={() => {
                    validateForm();
                    handleInputChange();
                  }}
                />
                <AddNutrition
                  id="protein"
                  label="Protein"
                  unit="g"
                  inputRef={nutritionRefs.protein}
                  onInput={() => {
                    validateForm();
                    handleInputChange();
                  }}
                />
                <AddNutrition
                  id="fat"
                  label="Fat"
                  unit="g"
                  inputRef={nutritionRefs.fat}
                  onInput={() => {
                    validateForm();
                    handleInputChange();
                  }}
                />
                <AddNutrition
                  id="carbohydrates"
                  label="Carbohydrates"
                  unit="g"
                  inputRef={nutritionRefs.carbohydrates}
                  onInput={() => {
                    validateForm();
                    handleInputChange();
                  }}
                />
                <AddNutrition
                  id="fiber"
                  label="Fiber"
                  unit="g"
                  inputRef={nutritionRefs.fiber}
                  onInput={() => {
                    validateForm();
                    handleInputChange();
                  }}
                />
                <AddNutrition
                  id="sodium"
                  label="Sodium"
                  unit="mg"
                  inputRef={nutritionRefs.sodium}
                  onInput={() => {
                    validateForm();
                    handleInputChange();
                  }}
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
                disabled={!canSubmit}
                className="text-3xl font-medium hover:cursor-pointer"
                style={{
                  opacity: canSubmit ? 1 : 0.5,
                  cursor: canSubmit ? "pointer" : "not-allowed",
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default NewRecipe;
