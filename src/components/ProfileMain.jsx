import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAuth } from "../context/AuthContext";
import LogoutConfirmation from "./LogoutConfirmation.jsx";
import DeleteConfirmation from "./DeleteConfirmation.jsx";
gsap.registerPlugin(ScrollTrigger);

import RecipeProfile from "./RecipeProfile.jsx";
import plus from "../assets/iconmonstr-x-mark-lined.svg";
import magnifier from "../assets/iconmonstr-magnifier-lined.svg";

function ProfileMain() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const recipeRefs = useRef([]);
  const addRecipeRef = useRef(null);

  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("chronological");

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchRecipes = async () => {
      try {
        const res = await fetch("api/recipes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch recipes");
        const data = await res.json();

        const myRecipes = data.filter((r) => r.userId === user.id);
        setRecipes(myRecipes);
      } catch (err) {
        console.error("Error fetching recipes:", err);
      }
    };

    fetchRecipes();
  }, [token, user]);

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

  const handleAddRecipe = () => {
    navigate("/newrecipe");
  };

  const handleEdit = (id) => {
    navigate(`/editrecipe/${id}`);
  };

  const confirmDelete = (id) => {
    setRecipeToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!recipeToDelete) return;

    try {
      const res = await fetch(`/api/recipes/${recipeToDelete}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to delete recipe");
      }

      setRecipes((prev) => prev.filter((r) => r.id !== recipeToDelete));
    } catch (err) {
      console.error("Error deleting recipe:", err);
    } finally {
      setShowDeleteModal(false);
      setRecipeToDelete(null);
    }
  };

  const handleLogoutClick = () => setShowLogoutModal(true);
  const handleConfirmLogout = () => {
    logout();
    setShowLogoutModal(false);
    navigate("/login");
  };
  const handleCancelLogout = () => setShowLogoutModal(false);

  return (
    <>
      <div className="mt-84 flex flex-col gap-30 mx-10">
        <div className="grid grid-cols-[6fr_5fr_1fr]">
          <h1 className="col-start-1 text-[15rem] leading-none font-light -translate-x-[1.45rem]">
            Recipes
          </h1>
          <p className="col-start-2 text-3xl text-darkGrey font-light">
            ({user ? user.username : "Loading..."})
          </p>
          <button
            className="col-start-3 font-light text-lg underline self-end -translate-y-[1.45rem] hover:cursor-pointer"
            onClick={handleLogoutClick}
          >
            Log out
          </button>
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
              {filteredRecipes.map((recipe, index) => (
                <RecipeProfile
                  key={recipe.id}
                  title={recipe.title}
                  image={recipe.image}
                  onEdit={() => handleEdit(recipe.id)}
                  onDelete={() => confirmDelete(recipe.id)}
                  ref={(el) => (recipeRefs.current[index] = el)}
                />
              ))}
              <li
                ref={addRecipeRef}
                className="h-20 grid grid-cols-[1fr_4fr] border-b group hover:cursor-pointer"
                onClick={handleAddRecipe}
              >
                <button className="col-start-1">
                  <img
                    src={plus}
                    alt=""
                    className="w-7 h-7 rotate-45 transition-all duration-300 ease-in-out group-hover:rotate-225"
                  />
                </button>
                <p className="col-start-2 inline-block content-center text-xl text-darkGrey">
                  Add a recipe
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {showLogoutModal && (
        <LogoutConfirmation
          onConfirm={handleConfirmLogout}
          onCancel={handleCancelLogout}
        />
      )}
      {showDeleteModal && (
        <DeleteConfirmation
          onConfirm={handleDeleteConfirmed}
          onCancel={() => {
            setShowDeleteModal(false);
            setRecipeToDelete(null);
          }}
        />
      )}
    </>
  );
}

export default ProfileMain;
