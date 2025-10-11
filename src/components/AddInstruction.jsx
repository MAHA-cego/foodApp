import { useRef } from "react";
import line from "../assets/iconmonstr-line-one-horizontal-lined.svg";

function AddInstruction() {
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
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <input
            type="text"
            id="subtitle"
            name="subtitle"
            placeholder="Your subtitle"
            className="text-lg placeholder:italic placeholder:font-light noBox "
          />
          <button>
            <img src={line} alt="" className="h-4 w-4 hover:cursor-pointer" />
          </button>
        </div>
        <textarea
          name="instruction"
          id="intruction"
          placeholder="Your instruction"
          ref={textareaRef}
          onInput={handleInput}
          rows={1}
          className="placeholder:italic placeholder:font-light noBox resize-none pt-9"
        ></textarea>
      </div>
    </>
  );
}

export default AddInstruction;
