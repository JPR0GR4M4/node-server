const readline = require("readline-sync");

// Clase "Task" para representar una sola tarea
class Task {
  constructor(indicator, description) {
    this.indicator = indicator;
    this.description = description;
    this.status = "Not Completed";
  }
}

// Clase "Task Manager" para administrar tareas
class TaskManager {
  constructor() {
    this.tasks = [];
  }

  // Add a new task
  addTask() {
    const indicator = readline.question("Enter task indicator: ");
    const description = readline.question("Enter task description: ");
    const task = new Task(indicator, description);
    this.tasks.push(task);
    console.log("Task added successfully!");
  }

  // Delete a Task por indicador
  deleteTask() {
    const indicator = readline.question("Enter task indicator to delete: ");
    const index = this.tasks.findIndex((task) => task.indicator === indicator);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      console.log("Task deleted successfully!");
    } else {
      console.log("Task not found!");
    }
  }

  // Complete a Task por indicador
  completeTask() {
    const indicator = readline.question("Enter task indicator to complete: ");
    const task = this.tasks.find((task) => task.indicator === indicator);
    if (task) {
      task.status = "Completed";
      console.log("Task completed successfully!");
    } else {
      console.log("Task not found!");
    }
  }

  // Print all tasks
  printTasks() {
    console.log("----- Tasks -----");
    this.tasks.forEach((task) => {
      console.log(`Indicator: ${task.indicator}`);
      console.log(`Description: ${task.description}`);
      console.log(`Status: ${task.status}`);
      console.log("-----------------");
    });
  }
}

// Function to display available options and execute chosen function
function displayMenu(taskManager) {
  console.log("\nTask Manager Menu");
  console.log("1. Add a task");
  console.log("2. Delete a task");
  console.log("3. Complete a task");
  console.log("4. Print all tasks");
  console.log("5. Quit\n");

  const choice = readline.question("Enter your choice: ");

  switch (choice) {
    case "1":
      taskManager.addTask();
      break;
    case "2":
      taskManager.deleteTask();
      break;
    case "3":
      taskManager.completeTask();
      break;
    case "4":
      taskManager.printTasks();
      break;
    case "5":
      return;
    default:
      console.log("Invalid choice!");
  }

  displayMenu(taskManager);
}

// Cree una instancia de "taskManager" y muestre el menú
const taskManager = new TaskManager();
displayMenu(taskManager);
