const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");
const { verifyUser } = require("../utils/middleware/handlers");

router.get("/tasks", verifyUser, taskController.getTaskList);
router.get("/tasks/:id", verifyUser, taskController.getTaskById);
router.post("/tasks", verifyUser, taskController.addTask);
router.put("/tasks", verifyUser, taskController.updateTask);
router.delete("/tasks/:id", verifyUser, taskController.deleteTask);
router.patch("/tasks", verifyUser, taskController.patchTaskDone);

module.exports = router;
