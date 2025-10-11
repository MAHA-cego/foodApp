function RecipeInstruction({ subtitle, instruction }) {
  return (
    <>
      <li className="flex flex-col gap-4">
        <p className="italic text-darkGrey self-end">{subtitle}</p>
        <p>{instruction}</p>
      </li>
    </>
  );
}

export default RecipeInstruction;
