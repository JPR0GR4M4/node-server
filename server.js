const http = require("http");

// Sample tasks array
const tasks = [
  { id: 1, description: "Task 1", status: "completed" },
  { id: 2, description: "Task 2", status: "pending" },
  { id: 3, description: "Task 3", status: "completed" },
];

// Create a server
const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.end(JSON.stringify(tasks));
});

// Start the server
server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
