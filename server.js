const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const listViewRouter = require("./list-view-router.js");
const listEditRouter = require("./list-edit-router.js");
const users = [
  { username: "George", password: "8642159" },
  { username: "Thomas", password: "3094782" },
];

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

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
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
