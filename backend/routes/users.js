import express from "express";
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();
const dataFile = path.resolve("models/users.json");

function readData() {
  return JSON.parse(fs.readFileSync(dataFile, "utf-8"));
}
function writeData(data) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const users = readData();

  if (users.find((u) => u.username === username))
    return res.status(400).json({ message: "User exists" });

  const hashed = await bcrypt.hash(password, 10);
  const newUser = { id: Date.now(), username, password: hashed };
  users.push(newUser);
  writeData(users);

  res.status(201).json({ message: "User created" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const users = readData();
  const user = users.find((u) => u.username === username);
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, username }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.json({ token });
});

export default router;
