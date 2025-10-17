import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  const handleDiscoverClick = async () => {
    try {
      const res = await fetch("/api/recipes");
      if (!res.ok) throw new Error("Failed to fetch recipes");

      const recipes = await res.json();
      if (recipes.length === 0) return;

      const random = recipes[Math.floor(Math.random() * recipes.length)];
      navigate(`/recipe/${random.id}`);
    } catch (err) {
      console.error("Error fetching random recipe:", err);
    }
  };

  const handleUploadClick = () => {
    const token = localStorage.getItem("token");
    navigate(token ? "/newrecipe" : "/login");
  };
  return (
    <>
      <footer className="grid grid-cols-[1fr_7fr_4fr] mt-60 mb-[2.125rem] pt-[3rem] border-t mx-10 text-lg">
        <p className="col-start-2 content-end">
          Life is too short to eat bad{" "}
          <span
            className="font-medium underline hover:cursor-pointer"
            onClick={() => navigate("/")}
          >
            food.
          </span>
        </p>
        <ul className="col-start-3">
          <li>
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
        </ul>
      </footer>
    </>
  );
}

export default Footer;
