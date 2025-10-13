import { useRef } from "react";
import line from "../assets/iconmonstr-line-one-horizontal-lined.svg";

function AddIngredient({ value, onChange, onRemove }) {
  const textareaRef = useRef(null);

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  return (
    <>
      <div className="flex flex-row w-full items-start">
        <textarea
          name="ingredient"
          value={value}
          onChange={onChange}
          placeholder="Your ingredient"
          className="flex-grow noBox placeholder:italic placeholder:font-light resize-none"
          ref={textareaRef}
          onInput={handleInput}
          rows={1}
        ></textarea>
        <button
          type="button"
          onClick={onRemove}
          className="ml-2 shrink-0 self-start"
        >
          <img
            src={line}
            alt="Remove"
            className="h-4 w-4 hover:cursor-pointer"
          />
        </button>
      </div>
    </>
  );
}

export default AddIngredient;
