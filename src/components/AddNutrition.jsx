function AddNutrition({ id, label, unit }) {
  return (
    <>
      <div className="flex flex-row justify-between w-full">
        <label htmlFor={id} className="font-light text-darkGrey">
          {label}
        </label>
        <div className="flex flex-row justify-between">
          <input
            type="number"
            id={id}
            name={id}
            className="w-auto noBox text-right px-1 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            placeholder="..."
            min="0"
          />
          <p className="text-darkGrey">{unit}</p>
        </div>
      </div>
    </>
  );
}

export default AddNutrition;
