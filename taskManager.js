const readline = require("readline-sync");

// Task class to represent a single task
class Task {
  constructor(indicator, description) {
    this.indicator = indicator;
    this.description = description;
    this.status = "Not Completed";
  }
}

// Task Manager class to manage tasks
class TaskManager {
  constructor() {
    this.tasks = [];
  }

  // Add a new task
  addTask() {
    return new Promise((resolve, reject) => {
      const indicator = readline.question("Enter task indicator: ");
      const description = readline.question("Enter task description: ");
      const task = new Task(indicator, description);
      this.tasks.push(task);
      resolve("Task added successfully!");
    });
  }

  // Delete a task by indicator
  deleteTask() {
    return new Promise((resolve, reject) => {
      const indicator = readline.question("Enter task indicator to delete: ");
      const index = this.tasks.findIndex(
        (task) => task.indicator === indicator
      );
      if (index !== -1) {
        this.tasks.splice(index, 1);
        resolve("Task deleted successfully!");
      } else {
        reject("Task not found!");
      }
    });
  }

  // Complete a task by indicator
  completeTask() {
    return new Promise((resolve, reject) => {
      const indicator = readline.question("Enter task indicator to complete: ");
      const task = this.tasks.find((task) => task.indicator === indicator);
      if (task) {
        task.status = "Completed";
        resolve("Task completed successfully!");
      } else {
        reject("Task not found!");
      }
    });
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
      taskManager
        .addTask()
        .then((result) => {
          console.log(result);
          displayMenu(taskManager);
        })
        .catch((error) => {
          console.log(error);
          displayMenu(taskManager);
        });
      break;
    case "2":
      taskManager
        .deleteTask()
        .then((result) => {
          console.log(result);
          displayMenu(taskManager);
        })
        .catch((error) => {
          console.log(error);
          displayMenu(taskManager);
        });
      break;
    case "3":
      taskManager
        .completeTask()
        .then((result) => {
          console.log(result);
          displayMenu(taskManager);
        })
        .catch((error) => {
          console.log(error);
          displayMenu(taskManager);
        });
      break;
    case "4":
      taskManager.printTasks();
      displayMenu(taskManager);
      break;
    case "5":
      return;
    default:
      console.log("Invalid choice!");
      displayMenu(taskManager);
  }
}

// Main function to run the program
async function runProgram() {
  console.log("Task Manager\n");

  while (true) {
    await displayMenu();
  }
}

runProgram()
  .then(() => {
    console.log("Program exited.");
  })
  .catch((error) => {
    console.log("An error occurred:", error);
  });

// Create an instance of TaskManager and display the menu
const taskManager = new TaskManager();
displayMenu(taskManager);
