import React, { useState, useEffect } from "react";
import eloImg from "../assets/0331940.jpg";

const HoverImageButton = () => {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [imgPos, setImgPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    if (!hovered) return;
    const anim = requestAnimationFrame(() => {
      setImgPos((prev) => ({
        x: prev.x + (mousePos.x + 500 - prev.x) * 0.1,
        y: prev.y + (mousePos.y - prev.y) * 0.1,
      }));
    });
    return () => cancelAnimationFrame(anim);
  }, [mousePos, hovered, imgPos]);

  return (
    <div className="relative h-screen flex items-center justify-center">
      <button
        className="px-5 py-2 text-lg bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={handleMouseMove}
      >
        Elo
      </button>

      {hovered && (
        <img
          src={eloImg}
          alt="hover"
          className="w-32 h-32 pointer-events-none fixed transition-transform duration-200 ease-out"
          style={{
            top: imgPos.y,
            left: imgPos.x,
          }}
        />
      )}
    </div>
  );
};

export default HoverImageButton;
