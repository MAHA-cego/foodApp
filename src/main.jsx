import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import MainPage from "./pages/MainPage.jsx";
import NewRecipePage from "./pages/NewRecipePage.jsx";
import RecipePage from "./pages/RecipePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import TestSalwa from "./components/TestSalwa.jsx";
import TitleTest from "./components/TitleTest.jsx";
import "@fontsource-variable/inter";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/newrecipe" element={<NewRecipePage />} />
        <Route path="/recipe" element={<RecipePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/titletest" element={<TitleTest />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
