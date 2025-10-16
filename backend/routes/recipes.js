import express from "express";
import fs from "fs";
import path from "path";
import multer from "multer";
import jwt from "jsonwebtoken";

const router = express.Router();
const dataFile = path.resolve("models/recipes.json");

//img upload
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

//read/write data
function readData() {
  return JSON.parse(fs.readFileSync(dataFile, "utf-8"));
}
function writeData(data) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

//get all recipes
router.get("/", (req, res) => {
  res.json(readData());
});

//post new recipe
router.post("/", upload.single("image"), (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const recipes = readData();
    const newRecipe = {
      id: Date.now(),
      title: req.body.title,
      description: req.body.description,
      image: req.file ? `/uploads/${req.file.filename}` : null,
      ingredients: JSON.parse(req.body.ingredients),
      instructions: JSON.parse(req.body.instructions),
      nutrition: JSON.parse(req.body.nutrition),
      servings: req.body.servings,
      userId: decoded.id,
      createdAt: new Date().toISOString(),
    };
    recipes.push(newRecipe);
    writeData(recipes);

    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
});

export default router;
