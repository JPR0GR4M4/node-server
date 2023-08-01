const express = require("express");
const router = express.Router();

module.exports = (tasks, taskId) => {
  const validateRequestBody = (req, res, next) => {
    if (req.method === "POST" && Object.keys(req.body).length === 0) {
      res.status(400).json({ error: "The request has no data." });
    } else if (
      req.method === "POST" &&
      (!req.body.title || typeof req.body.title !== "string")
    ) {
      res
        .status(400)
        .json({ error: "The request has an invalid description." });
    } else if (req.method === "PUT" && Object.keys(req.body).length === 0) {
      res.status(400).json({ error: "The request has no data." });
    } else if (
      req.method === "PUT" &&
      (req.body.completed === undefined ||
        typeof req.body.completed !== "boolean")
    ) {
      res.status(400).json({
        error: "The request has an invalid completed status.",
      });
    } else {
      next();
    }
  };
  
  router.post("/create", validateRequestBody, (req, res) => {
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
      res.status(404).json({ error: "Task not found for the given ID." });
    }
  });

  router.put("/update/:id", validateRequestBody, (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find((task) => task.id === id);
    if (task) {
      task.completed = req.body.completed;
      res.json({ message: "The task has been successfully updated.", task });
    } else {
      res.status(404).json({ error: "Task not found for the given ID." });
    }
  });

  return router;
};
