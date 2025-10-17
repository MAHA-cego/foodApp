import { useNavigate } from "react-router-dom";
import brightnessIcon from "../assets/iconmonstr-brightness-10.svg";

function Nav() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleUploadClick = () => {
    if (token) {
      navigate("/newrecipe");
    } else {
      navigate("/login");
    }
  };

  const handleDiscoverClick = async () => {
    try {
      const res = await fetch("/api/recipes");
      if (!res.ok) throw new Error("Failed to fetch recipe");

      const recipes = await res.json();
      if (recipes.length === 0) return;

      const random = recipes[Math.floor(Math.random() * recipes.length)];
      navigate(`/recipe/${random.id}`);
    } catch (err) {
      console.error("Error fetching random recipes:", err);
    }
  };

  return (
    <nav className="grid grid-cols-[2fr_1fr] px-10 pt-[1.875rem]  fixed w-full top-0 z-100 ">
      <h2
        className="grid-start-1 text-3xl font-medium -translate-0.5 hover:cursor-pointer"
        onClick={() => navigate("/")}
      >
        Food.
      </h2>
      <div className="grid-start-2">
        <ul className="flex flex-row justify-between text-lg">
          <li className="">
            <button
              onClick={handleUploadClick}
              className="hover:cursor-pointer"
            >
              Upload
            </button>
          </li>
          <li>
            <button
              onClick={handleDiscoverClick}
              className="hover:cursor-pointer"
            >
              Discover
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/profile")}
              className="hover:cursor-pointer"
            >
              Profile
            </button>
          </li>
          <li>
            <img
              src={brightnessIcon}
              alt=""
              className="w-5 hover:cursor-pointer"
            />
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
