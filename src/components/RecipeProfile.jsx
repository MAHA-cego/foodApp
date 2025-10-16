import React, { useState, useEffect, useRef, forwardRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import arrow from "../assets/iconmonstr-arrow-right-lined.svg";
import eggFriedRiceImg from "../assets/egg-fried-rice-main-preview.webp";

gsap.registerPlugin(ScrollTrigger);

const RecipeProfile = forwardRef(({ title, image }, ref) => {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [imgOffset, setImgOffset] = useState({ x: 0, y: 0 });
  const [showImage, setShowImage] = useState(false);

  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const relativeY = e.clientY - rect.top;

    setMousePos({ x: relativeX, y: relativeY });
  };

  const basePercent = { x: 35, y: -7 };
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

  console.log(image);

  return (
    <div
      ref={(el) => {
        containerRef.current = el;
        if (typeof ref === "function") ref(el);
        else if (ref) ref.current = el;
      }}
      className={`grid grid-cols-[1fr_4fr] border-b text-xl transition-all duration-300 ease-in-out pt-6 ${
        hovered ? "h-34" : "h-20"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setShowImage(false);
      }}
      onMouseMove={handleMouseMove}
    >
      <button className="col-start-1 self-start">
        <img
          src={arrow}
          alt="Search"
          className={`h-8 w-8 transform transition-transform duration-300 ${
            hovered ? "rotate-90" : "rotate-0"
          }`}
        />
      </button>
      <div className="col-start-2 flex flex-col gap-8">
        <h3 className="inline-block content-center font-medium hover:cursor-pointer">
          {title}
        </h3>
        <div
          className={`col-start-2 flex flex-row transition-opacity duration-300 text-lg gap-30 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button className="hover:cursor-pointer underline">Edit</button>
          <button className="text-darkGrey hover:cursor-pointer underline decoration-darkGrey">
            Delete
          </button>
        </div>
      </div>

      <img
        src={
          image ? `http://localhost:5000${image}` : "/images/placeholder.png"
        }
        alt={title}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/images/placeholder.png";
        }}
        className={`absolute w-60 h-60 object-cover pointer-events-none z-50 transition-all duration-300 ease-out ${
          hovered && showImage ? "opacity-100" : "opacity-0"
        }`}
        style={{
          top: `${basePos.current.y}px`,
          left: `${basePos.current.x}px`,
          transform: `translate(${imgOffset.x}px, ${imgOffset.y}px)`,
        }}
      />
    </div>
  );
});

export default RecipeProfile;
