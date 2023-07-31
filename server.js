const express = require("express");
const app = express();
const listViewRouter = require("./list-view-router.js");
const listEditRouter = require("./list-edit-router.js");

app.use(express.json());

const validationHttp = (req, res, next) => {
  const validMethods = ["GET", "POST", "PUT", "DELETE"];
  if (!validMethods.includes(req.method)) {
    return res.status(405).json({ error: "Invalid HTTP method." });
  }
  next();
};

app.use(validateMethodMiddleware);

let tasks = [];
let taskId = 1;

app.use("/edit", listEditRouter(tasks, taskId));
app.use("/view", listViewRouter(tasks));

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.listen(3200, () => {
  console.log("Server running on port 3200.");
});
