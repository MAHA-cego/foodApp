import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import recipesRouter from "./routes/recipes.js";
import usersRouter from "./routes/users.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.resolve("uploads")));

app.use("/api/recipes", recipesRouter);
app.use("/api/users", usersRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
