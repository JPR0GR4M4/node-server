const express = require("express");
const router = express.Router();

const validateMiddleware = (req, res, next) => {
  const { id } = req.params;
  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ error: "Invalid parameter." });
  }
  next();
};

module.exports = (tasks) => {
  router.get("/completed", (req, res) => {
    const completedTasks = tasks.filter((task) => task.completed);
    res.json(completedTasks);
  });

  router.get("/incomplete", (req, res) => {
    const incompleteTasks = tasks.filter((task) => !task.completed);
    res.json(incompleteTasks);
  });

  router.get("/:id", validateMiddleware, (req, res) => {
    const { id } = req.params;
    const task = tasks.find((task) => task.id === parseInt(id));

    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ error: "Task not found for the given ID." });
    }
  });

  return router;
};
