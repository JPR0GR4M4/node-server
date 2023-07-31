const express = require("express");
const app = express();
const listViewRouter = require("./list-view-router.js");
const listEditRouter = require("./list-edit-router.js");

app.use(express.json());

let tasks = [];
let taskId = 1;

app.use("/edit", listEditRouter(tasks, taskId));
app.use("/view", listViewRouter(tasks));

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.listen(3000, () => {
  console.log("Server running on port 3000.");
});
