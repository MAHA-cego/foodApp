import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import RecipeOtherProfile from "./RecipeOtherProfile.jsx";
import plus from "../assets/iconmonstr-x-mark-lined.svg";
import magnifier from "../assets/iconmonstr-magnifier-lined.svg";

function ProfileOther() {
  const recipeRefs = useRef([]);
  const addRecipeRef = useRef(null);

  useEffect(() => {
    recipeRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          delay: i * 0.1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    });

    if (addRecipeRef.current) {
      gsap.fromTo(
        addRecipeRef.current,
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          delay: recipeRefs.current.length * 0.1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: addRecipeRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    }
  }, []);

  return (
    <>
      <div className="mt-84 flex flex-col gap-30 mx-10">
        <div className="grid grid-cols-[1fr_1fr]">
          <h1 className="col-start-1 text-[15rem] leading-none font-light -translate-x-[1.45rem]">
            Recipes
          </h1>
          <p className="col-start-2 text-4xl text-darkGrey font-light">
            (Other)
          </p>
        </div>
        <div className="border-t-3 grid grid-cols-[2fr_2fr_3fr_5fr]">
          <div className="col-start-1 mt-10 text-xl">
            <div>
              <p className="font-light italic">Sorting :</p>
              <button>Alphabelical</button>
            </div>
          </div>
          <div className="col-start-2 mt-10 text-xl">
            <form action="">
              <label htmlFor="search" className="font-light italic">
                Search :
              </label>
              <div className="flex flex-row">
                <input
                  type="text"
                  name="search"
                  id="search"
                  autoComplete="off"
                  spellCheck="false"
                  placeholder="..."
                  className="border-none outline-none w-full"
                />
                <button>
                  <img src={magnifier} alt="" width="18" height="18" />
                </button>
              </div>
            </form>
          </div>
          <div className="col-start-4">
            <ul>
              {[0, 1, 2].map((_, i) => (
                <li key={i} ref={(el) => (recipeRefs.current[i] = el)}>
                  <RecipeOtherProfile />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileOther;
