const mongoClient = require("./services/database/mongo.db");
const {
  invalidRoute,
  errorHandler,
  routeLogger,
} = require("./utils/middleware/handlers");
const taskRoutes = require("./routes/task.routes");
const userRoutes = require("./routes/user.routes");
const express = require("express");
const app = express();

// connects to mongoDb
mongoClient.connectDb("mongodb://127.0.0.1:27017/to-do");

// MiddleWares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routeLogger);
app.use("/", taskRoutes);
app.use("/", userRoutes);
// 404 Handler;
app.use(invalidRoute);
// Error Handler
app.use(errorHandler);

// Server Listening To
app.listen("8080", () => {
  console.log("Server is listening to Port:8080");
});
