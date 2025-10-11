import { useRef } from "react";
import line from "../assets/iconmonstr-line-one-horizontal-lined.svg";

function AddIngredient() {
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
      <div className="flex flex-row justify-between">
        <textarea
          name="ingredient"
          id="ingredient"
          placeholder="Your ingredient"
          className="noBox placeholder:italic placeholder:font-light resize-none"
          ref={textareaRef}
          onInput={handleInput}
          rows={1}
        ></textarea>
        <button>
          <img src={line} alt="" className="h-4 w-4 hover:cursor-pointer" />
        </button>
      </div>
    </>
  );
}

export default AddIngredient;
