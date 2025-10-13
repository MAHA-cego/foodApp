import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

import magnifier from "../assets/iconmonstr-magnifier-lined.svg";
import RecipeMain from "../components/RecipeMain.jsx";

function Main() {
  const titleRef = useRef();
  const [scrolled, setScrolled] = useState(false);

  useGSAP(() => {
    const trigger = ScrollTrigger.create({
      trigger: titleRef.current,
      start: "top-=250 top",
      end: "bottom top",
      onUpdate: (self) => {
        const threshold = 0.05;
        if (self.progress > threshold && !scrolled) {
          setScrolled(true);
        } else if (self.progress <= threshold && scrolled) {
          setScrolled(false);
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, [scrolled]);

  return (
    <>
      <div className="mx-[2.5rem] overflow-hidden">
        <div className="mt-[12.5rem]">
          <div
            className={`grid grid-cols-[4fr_1fr_1fr] items-end pb-[7.5rem] transition-all duration-700 ease-in-out ${
              scrolled ? "border-b-3 border-black" : "border-none"
            }`}
          >
            <h1
              ref={titleRef}
              className={`
                col-start-1 leading-none transition-all duration-700 ease-in-out
                translate-x-[-1.625rem] translate-y-[2rem]
                ${
                  scrolled
                    ? "text-[18.75rem] mt-0"
                    : "text-[25rem] mt-[15.625rem]"
                }
              `}
            >
              Food.
            </h1>
            <div
              className={`
                col-start-2 transition-opacity duration-700 ease-in-out
                ${scrolled ? "opacity-100" : "opacity-0"}
              `}
            >
              <p className="text-lg italic font-light">Sorting :</p>
              <button className="text-lg hover:cursor-pointer">
                Alphabetical
              </button>
            </div>
            <div
              className={`
                col-start-3 min-w-0 transition-opacity duration-700 ease-in-out
                ${scrolled ? "opacity-100" : "opacity-0"}
              `}
            >
              <form action="" className="flex flex-col">
                <label htmlFor="search" className="text-lg italic font-light">
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
                    className="text-lg border-none outline-none w-full"
                  />
                  <button type="submit" className="ml-2 hover:cursor-pointer">
                    <img src={magnifier} alt="Search" width="18" height="18" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="z-2">
          <RecipeMain />
          <RecipeMain />
          <RecipeMain />
          <RecipeMain />
        </div>
        <div className="mt-[7.5rem] grid grid-cols-[7fr_3fr_2fr]">
          <div className="col-start-2 flex flex-col gap-6">
            <h2 className="text-3xl font-medium leading-10">
              Did not find <br /> what you needed?
            </h2>
            <p className="text-xl text-darkGrey leading-6">
              Recipes are being added every day by our users, be sure to drop by
              later.
            </p>
            <a href="" className="text-2xl underline mt-1 hover:cursor-pointer">
              Add your own !
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
