import { useRef } from "react";
import line from "../assets/iconmonstr-line-one-horizontal-lined.svg";

function AddInstruction({ subtitle, instruction, onChange, onRemove }) {
  const subtitleRef = useRef(null);
  const instructionRef = useRef(null);

  const handleInput = (ref) => {
    const textarea = ref.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <textarea
            name="subtitle"
            ref={subtitleRef}
            value={subtitle}
            onChange={(e) => onChange("subtitle", e.target.value)}
            placeholder="Your subtitle"
            className="text-lg flex-grow noBox placeholder:italic placeholder:font-light resize-none"
            onInput={() => handleInput(subtitleRef)}
            rows={1}
          ></textarea>
          <button type="button" onClick={onRemove}>
            <img
              src={line}
              alt="Remove"
              className="h-4 w-4 hover:cursor-pointer"
            />
          </button>
        </div>
        <textarea
          placeholder="Your instruction"
          value={instruction}
          ref={instructionRef}
          onChange={(e) => onChange("instruction", e.target.value)}
          onInput={() => handleInput(instructionRef)}
          rows={1}
          className="placeholder:italic placeholder:font-light noBox resize-none pt-2"
        ></textarea>
      </div>
    </>
  );
}

export default AddInstruction;
