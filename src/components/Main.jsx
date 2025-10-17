import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

import magnifier from "../assets/iconmonstr-magnifier-lined.svg";
import RecipeMain from "../components/RecipeMain.jsx";

function Main() {
  const titleRef = useRef();
  const [scrolled, setScrolled] = useState(false);

  const [recipes, setRecipes] = useState([]);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);

  const [sortBy, setSortBy] = useState("chronological");
  const [searchQuery, setSearchQuery] = useState("");

  const { user } = useAuth();
  const isLoggedIn = !!user;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipesAndUsers = async () => {
      try {
        const res = await fetch("/api/recipes");
        if (!res.ok) throw new Error("Failed to fetch recipes");
        const data = await res.json();
        setRecipes(data);

        const uniqueUserIds = [
          ...new Set(data.map((r) => r.userId.toString())),
        ];
        const userData = {};
        await Promise.all(
          uniqueUserIds.map(async (id) => {
            const userRes = await fetch(`/api/users/${id}`);
            if (!userRes.ok) throw new Error(`Failed to fetch user ${id}`);
            const u = await userRes.json();
            userData[id.toString()] = u.username || "Unknown";
          })
        );
        setUsers(userData);
      } catch (err) {
        console.error("Error fetching recipes or users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipesAndUsers();
  }, []);

  const filteredRecipes = recipes
    .filter((recipe) =>
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "alphabetical") {
        return a.title.localeCompare(b.title);
      } else if (sortBy === "chronological") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return 0;
    });

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
              <button
                className="text-lg hover:cursor-pointer"
                onClick={() =>
                  setSortBy((prev) =>
                    prev === "alphabetical" ? "chronological" : "alphabetical"
                  )
                }
              >
                {sortBy === "alphabetical" ? "Alphabetical" : "Chronological"}
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
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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
          {loading ? (
            <p>Loading recipes...</p>
          ) : filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <RecipeMain
                key={recipe.id}
                id={recipe.id}
                date={recipe.createdAt}
                title={recipe.title}
                image={recipe.image}
                creatorName={users[recipe.userId.toString()] || "Unknown"}
                creatorId={recipe.userId}
              />
            ))
          ) : (
            <p>No recipes found.</p>
          )}
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
            <a
              className="text-2xl underline mt-1 hover:cursor-pointer"
              onClick={() => {
                if (isLoggedIn) {
                  navigate("/newrecipe");
                } else {
                  navigate("/login");
                }
              }}
            >
              Add your own!
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
