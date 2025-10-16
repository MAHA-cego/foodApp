import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import visible from "../assets/iconmonstr-eye-lined.svg";
import hidden from "../assets/iconmonstr-eye-off-lined.svg";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, password);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="mt-52 w-150 mx-auto">
        <div className="flex flex-row justify-between pb-10 border-b">
          <h1
            className="text-4xl hover:cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Log in
          </h1>
          <h1 className="text-4xl underline hover:cursor-pointer">Sign up</h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="col-start-2 col-span-2 flex flex-col pt-22 gap-16"
        >
          <input
            type="text"
            placeholder="Username"
            className="text-xl noBox"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="flex flex-row justify-between">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="text-xl noBox"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              <img
                src={showPassword ? hidden : visible}
                alt="toggle password visibility"
                className="h-6 w-6 hover:cursor-pointer"
              />
            </button>
          </div>
          <input
            type="submit"
            value="Continue"
            className="text-right text-3xl font-medium pt-3 hover:cursor-pointer"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
        <div className="col-start-4"></div>
      </div>
    </>
  );
}

export default Register;
