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

//get one recipe
router.get("/:id", (req, res) => {
  const recipes = readData();
  const recipe = recipes.find((r) => r.id.toString() === req.params.id);
  if (!recipe) {
    return res.status(404).json({ message: "Recipe not found" });
  }
  res.json(recipe);
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

//put a recipe
router.put("/:id", upload.single("image"), (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const recipes = readData();
    const index = recipes.findIndex((r) => r.id.toString() === req.params.id);

    if (index === -1) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    if (recipes[index].userId !== decoded.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updatedRecipe = {
      ...recipes[index],
      title: req.body.title || recipes[index].title,
      description: req.body.description || recipes[index].description,
      image: req.file ? `/uploads/${req.file.filename}` : recipes[index].image,
      ingredients: req.body.ingredients
        ? JSON.parse(req.body.ingredients)
        : recipes[index].ingredients,
      instructions: req.body.instructions
        ? JSON.parse(req.body.instructions)
        : recipes[index].instructions,
      nutrition: req.body.nutrition
        ? JSON.parse(req.body.nutrition)
        : recipes[index].nutrition,
      servings: req.body.servings || recipes[index].servings,
      updatedAt: new Date().toISOString(),
    };

    recipes[index] = updatesRecipe;
    writeData(recipes);

    res.json(updatedRecipe);
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Unauthorized or invalid token" });
  }
});

// delete a recipe
router.delete("/:id", (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const recipes = readData();
    const index = recipes.findIndex((r) => r.id.toString() === req.params.id);

    if (index === -1) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    if (recipes[index].userId !== decoded.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const imagePath = recipes[index].image?.replace("/uploads/", "uploads/");
    if (imagePath && fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    recipes.splice(index, 1);
    writeData(recipes);

    res.json({ message: "Recipe deleted" });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Unauthorized or invalid token" });
  }
});

export default router;
