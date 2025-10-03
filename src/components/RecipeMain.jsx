import React, { useState, useEffect, useRef } from "react";
import arrow from "../assets/iconmonstr-arrow-right-lined.svg";
import eggFriedRiceImg from "../assets/egg-fried-rice-main-preview.webp";

function RecipeMain() {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [imgPos, setImgPos] = useState({ x: 0, y: 0 });
  const [showImage, setShowImage] = useState(false);
  const [imgOffset, setImgOffset] = useState({ x: 0, y: 0 });

  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const relativeY = e.clientY - rect.top;

    setMousePos({ x: relativeX, y: relativeY });
  };

  const basePercent = { x: 70, y: -11 };
  const basePos = useRef(getBasePos());

  function getBasePos() {
    return {
      x: (window.innerWidth * basePercent.x) / 100,
      y: (window.innerHeight * basePercent.y) / 100,
    };
  }

  useEffect(() => {
    if (!hovered) return;

    const anim = requestAnimationFrame(() => {
      const offsetX = (mousePos.x - basePos.current.x) * 0.05;
      const offsetY = (mousePos.y - basePos.current.y) * 0.05;

      setImgOffset({ x: offsetX, y: offsetY });
      setShowImage(true);
    });

    return () => cancelAnimationFrame(anim);
  }, [mousePos, hovered]);

  return (
    <>
      <div
        ref={containerRef}
        className="relative grid grid-cols-[2fr_3fr_6fr_1fr] h-[6.25rem] border-b text-[1.5rem]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setShowImage(false);
        }}
        onMouseMove={handleMouseMove}
      >
        <p className="col-start-1 inline-block content-center text-darkGrey">
          21.09.2025
        </p>
        <button className="col-start-2 justify-self-start border h-[2.3rem] w-[6rem] rounded-lg self-center hover:cursor-pointer">
          Cédric
        </button>
        <h3 className="col-start-3 inline-block content-center font-medium hover:cursor-pointer">
          Stir fried rice
        </h3>
        <button className="col-start-4 justify-self-end hover:cursor-pointer">
          <img src={arrow} alt="Search" width="40" height="40" />
        </button>

        {
          <img
            src={eggFriedRiceImg}
            alt="hover"
            className={`absolute h-[287px] w-[287px] pointer-events-none z-50
              transition-all duration-300 ease-out
              ${hovered && showImage ? "opacity-100" : "opacity-0"}
            `}
            style={{
              top: `${basePos.current.y}px`,
              left: `${basePos.current.x}px`,
              transform: `translate(${imgOffset.x}px, ${imgOffset.y}px)`,
            }}
          />
        }
      </div>
    </>
  );
}

export default RecipeMain;
