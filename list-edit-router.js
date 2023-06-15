const express = require("express");
const router = express.Router();

let tasks = [
  { id: 1, title: "Task 1", completed: true },
  { id: 2, title: "Task 2", completed: false },
  { id: 3, title: "Task 3", completed: true },
];

router.post("/create", (req, res) => {
  const { title, completed } = req.body;
  const newTask = { id: Date.now(), title, completed };
  tasks.push(newTask);
  res.json(newTask);
});

router.delete("/delete/:taskId", (req, res) => {
  const taskId = req.params.taskId;
  tasks = tasks.filter((task) => task.id !== parseInt(taskId));
  res.json({ message: `Task with ID ${taskId} deleted successfully` });
});

router.put("/update/:taskId", (req, res) => {
  const taskId = req.params.taskId;
  const { title, completed } = req.body;
  const taskToUpdate = tasks.find((task) => task.id === parseInt(taskId));
  if (!taskToUpdate) {
    res.status(404).json({ error: `Task with ID ${taskId} not found` });
  } else {
    taskToUpdate.title = title || taskToUpdate.title;
    taskToUpdate.completed = completed || taskToUpdate.completed;
    res.json(taskToUpdate);
  }
});

module.exports = router;
