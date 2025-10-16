import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import App from "./App.jsx";
import MainPage from "./pages/MainPage.jsx";
import NewRecipePage from "./pages/NewRecipePage.jsx";
import RecipePage from "./pages/RecipePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ProfileOtherPage from "./pages/ProfileOtherPage.jsx";
import TestSalwa from "./components/TestSalwa.jsx";
import TitleTest from "./components/TitleTest.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import "@fontsource-variable/inter";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="/newrecipe"
            element={
              <ProtectedRoute>
                <NewRecipePage />
              </ProtectedRoute>
            }
          />
          <Route path="/recipe/:id" element={<RecipePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/profileother" element={<ProfileOtherPage />} />
          <Route path="/titletest" element={<TitleTest />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
