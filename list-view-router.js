const express = require("express");
const router = express.Router();

const tasks = [
  { id: 1, title: "Task 1", completed: true },
  { id: 2, title: "Task 2", completed: false },
  { id: 3, title: "Task 3", completed: true },
];

router.get("/complete", (req, res) => {
  const completeTasks = tasks.filter((task) => task.completed);
  res.json(completeTasks);
});

router.get("/incomplete", (req, res) => {
  const incompleteTasks = tasks.filter((task) => !task.completed);
  res.json(incompleteTasks);
});

module.exports = router;
