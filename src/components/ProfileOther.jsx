import { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import RecipeOtherProfile from "./RecipeOtherProfile.jsx";
import magnifier from "../assets/iconmonstr-magnifier-lined.svg";

function ProfileOther() {
  const { userId } = useParams();
  const recipeRefs = useRef([]);
  const addRecipeRef = useRef(null);

  const [recipes, setRecipes] = useState([]);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("chronological");

  useEffect(() => {
    const fetchUserAndRecipes = async () => {
      try {
        const userRes = await fetch(`/api/users/${userId}`);
        if (!userRes.ok) throw new Error("Failed to fetch user");
        const userData = await userRes.json();
        setUser(userData);

        const recipeRes = await fetch("/api/recipes");
        if (!recipeRes.ok) throw new Error("Failed to fetch recipes");
        const allRecipes = await recipeRes.json();
        const userRecipes = allRecipes.filter(
          (r) => r.userId.toString() === userId
        );
        setRecipes(userRecipes);
      } catch (err) {
        console.error("Error fetching user or recipes:", err);
      }
    };

    fetchUserAndRecipes();
  }, [userId]);

  const filteredRecipes = recipes
    .filter((r) => r.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "alphabetical") return a.title.localeCompare(b.title);
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

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
  }, [filteredRecipes]);

  return (
    <>
      <div className="mt-84 flex flex-col gap-30 mx-10">
        <div className="grid grid-cols-[1fr_1fr]">
          <h1 className="col-start-1 text-[15rem] leading-none font-light -translate-x-[1.45rem]">
            Recipes
          </h1>
          <p className="col-start-2 text-3xl text-darkGrey font-light">
            ({user ? user.username : "Loading..."})
          </p>
        </div>
        <div className="border-t-3 grid grid-cols-[2fr_2fr_1fr_7fr]">
          <div className="col-start-1 mt-10 text-lg">
            <div>
              <p className="font-light italic">Sorting :</p>
              <button
                onClick={() =>
                  setSortBy((prev) =>
                    prev === "chronological" ? "alphabetical" : "chronological"
                  )
                }
              >
                {sortBy === "chronological" ? "Chronological" : "Alphabetical"}
              </button>
            </div>
          </div>
          <div className="col-start-2 mt-10 text-lg">
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
              {filteredRecipes.map((recipe, i) => (
                <RecipeOtherProfile
                  key={recipe.id}
                  id={recipe.id}
                  title={recipe.title}
                  image={recipe.image}
                  ref={(el) => (recipeRefs.current[i] = el)}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileOther;
