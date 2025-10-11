function AddNutrition({ id, label, unit }) {
  return (
    <>
      <div className="flex flex-row justify-between w-full">
        <label htmlFor={id} className="text-xl font-light text-darkGrey">
          {label}
        </label>
        <div className="flex flex-row justify-between text-xl">
          <input
            type="number"
            id={id}
            name={id}
            className="w-auto noBox text-right px-1 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            placeholder="..."
            min="0"
          />
          <p>{unit}</p>
        </div>
      </div>
    </>
  );
}

export default AddNutrition;
