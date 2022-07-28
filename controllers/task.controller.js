const TaskModel = require("../models/task.model");
const { successHandler } = require("../utils/middleware/handlers");

class TaskController {
  /**
   * @function getTaskList
   * @description get all the tasks from db
   */
  async getTaskList(req, res, next) {
    try {
      const TasksList = await TaskModel.find({});
      return successHandler(200, "Success", TasksList, res);
    } catch (error) {
      next(error);
    }
  }
  /**
   * @function getTaskById
   * @description find one task by id
   */
  async getTaskById(req, res, next) {
    try {
      if (!req.params.id) throw new Error("Id is Required");
      const taskData = await TaskModel.findOne({ _id: req.params.id });
      return successHandler(200, "Success", taskData, res);
    } catch (error) {
      next(error);
    }
  }
  /**
   * @function addTask
   * @description create a task in db
   */
  async addTask(req, res, next) {
    try {
      await TaskModel.create(req.body);
      return successHandler(201, "Success", {}, res);
    } catch (error) {
      next(error);
    }
  }
  /**
   * @function updateTask
   * @description update task in db
   */
  async updateTask(req, res, next) {
    try {
      if (!req.body.id) throw new Error("Id is Required");
      const updatedTask = await TaskModel.findOneAndUpdate(
        { _id: req.body.id },
        { $set: req.body },
        { new: true }
      );
      return successHandler(200, "Success", updatedTask, res);
    } catch (error) {
      next(error);
    }
  }
  /**
   * @function deleteTask
   * @description delete as task by id
   */
  async deleteTask(req, res, next) {
    try {
      if (!req.params.id) throw new Error("Id is Required");
      await TaskModel.deleteOne({ _id: req.params.id });
      return successHandler(200, "Success", {}, res);
    } catch (error) {
      next(error);
    }
  }
  /**
   * @function patchTaskDone
   * @description mark task as done
   */
  async patchTaskDone(req, res, next) {
    try {
      if (!req.body.id) throw new Error("Id is Required");
      if (!req.body.hasOwnProperty("isDone"))
        throw new Error("isDone is Required");
      await TaskModel.updateOne(
        { _id: req.body.id },
        { $set: { isDone: req.body.isDone } }
      );
      return successHandler(200, "Success", {}, res);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TaskController();
