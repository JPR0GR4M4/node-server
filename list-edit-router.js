const express = require("express");
const router = express.Router();

module.exports = (tasks, taskId) => {
  router.post("/create", (req, res) => {
    const { title } = req.body;
    const id = taskId++;
    const task = {
      id,
      title,
      completed: false,
    };
    tasks.push(task);
    res.json({ message: "The task has been created successfully.", task });
  });
  
  router.delete("/delete/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
      res.json({ message: "The task has been successfully deleted." });
    } else {
      res.status(404).json({ error: "Task not found." });
    }
  });
  
  router.put("/update/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find((task) => task.id === id);
    if (task) {
      task.completed = true;
      res.json({ message: "The task has been successfully updated.", task });
    } else {
      res.status(404).json({ error: "Task not found." });
    }
  });
  
  return router;
};
