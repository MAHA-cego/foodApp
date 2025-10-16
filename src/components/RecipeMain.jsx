import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import arrow from "../assets/iconmonstr-arrow-right-lined.svg";
import eggFriedRiceImg from "../assets/egg-fried-rice-main-preview.webp";

gsap.registerPlugin(ScrollTrigger);

function RecipeMain({ date, title, image }) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [imgPos, setImgPos] = useState({ x: 0, y: 0 });
  const [showImage, setShowImage] = useState(false);
  const [imgOffset, setImgOffset] = useState({ x: 0, y: 0 });

  const containerRef = useRef(null);
  const recipeRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const relativeY = e.clientY - rect.top;

    setMousePos({ x: relativeX, y: relativeY });
  };

  const basePercent = { x: 70, y: -9.5 };
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

  useEffect(() => {
    gsap.fromTo(
      recipeRef.current,
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: recipeRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
          once: true,
        },
      }
    );
  }, []);

  console.log("Raw date value:", date);

  const formattedDate = date
    ? new Date(date).toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "";

  return (
    <>
      <div
        ref={(el) => {
          containerRef.current = el;
          recipeRef.current = el;
        }}
        className="relative grid grid-cols-[2fr_3fr_6fr_1fr] h-21 hover:h-25 border-b duration-300 text-xl transition-all"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setShowImage(false);
        }}
        onMouseMove={handleMouseMove}
      >
        <p className="col-start-1 inline-block content-center text-darkGrey">
          {formattedDate}
        </p>
        <button className="col-start-2 justify-self-start border h-[2.3rem] w-24 rounded-lg self-center hover:cursor-pointer">
          User
        </button>
        <h3 className="col-start-3 inline-block content-center font-medium hover:cursor-pointer">
          {title || "Untitled Recipe"}
        </h3>
        <button
          className={`col-start-4 justify-self-end hover:cursor-pointer transition-all duration-300 ease-out ${
            hovered ? "rotate-90" : "rotate-0"
          }`}
        >
          <img src={arrow} alt="Search" width="30" height="30" />
        </button>

        {
          <img
            src={`/images/${image}`}
            alt={title}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/placeholder.png";
            }}
            className={`absolute h-65 w-65 pointer-events-none z-50
              transition-all duration-300 ease-out object-cover
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
