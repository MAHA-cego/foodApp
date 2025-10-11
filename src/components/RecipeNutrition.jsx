function RecipeNutrition({ type, quantity }) {
  return (
    <>
      <li className="flex flex-row justify-between border-b py-5 border-b-lightGrey">
        <p className="text-darkGrey">{type}</p>
        <p>{quantity}</p>
      </li>
    </>
  );
}

export default RecipeNutrition;
