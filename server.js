const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const listViewRouter = require("./list-view-router.js");
const listEditRouter = require("./list-edit-router.js");

app.use(express.json());

const validateMiddleware = (req, res, next) => {
  const validMethods = ["GET", "POST", "PUT", "DELETE"];
  if (!validMethods.includes(req.method)) {
    return res.status(405).json({ error: "Invalid HTTP method." });
  }
  next();
};

app.use(validateMiddleware);

let tasks = [];
let taskId = 1;
const registeredUsers = [];

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "You must enter a username and password." });
  }
  const existingUser = registeredUsers.find(
    (user) => user.username === username
  );
  if (existingUser) {
    return res.status(400).json({
      error: "The username already exists, choose another one.",
    });
  }
  const newUser = { username, password };
  registeredUsers.push(newUser);
  res.json({ message: "User created successfully." });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = registeredUsers.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) {
    return res.status(401).json({ error: "Incorrect data." });
  }
  const token = jwt.sign({ username }, process.env.JWT_SECRET);
  res.json({ token });
});

app.get("/protected-route", (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Token not given." });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid Token." });
    }
    res.json({ message: "Successful access to the protected route." });
  });
});

app.use("/edit", listEditRouter(tasks, taskId));
app.use("/view", listViewRouter(tasks));

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.listen(3200, () => {
  console.log("Server running on port 3200.");
});
