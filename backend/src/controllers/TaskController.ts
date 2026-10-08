/*
 * -------------- Yoga Wilanda Documentation V.1.0.0 -----------------
 *
 * <meta_config>
 * Author__________________: yogawilanda <eayogawilanda@gmail.com>
 * Path____________________: backend\src\controllers\TaskController.ts
 * Purpose_________________: Handle HTTP requests for task operations
 * Version_________________: 1.0.0
 * Status__________________: active
 * </meta_config>
 *
 * Function               : Task HTTP Controller
 * Loc                    : TaskController.ts
 *
 * Responsibilities:
 * - Validate basic HTTP request input.
 * - Delegate task operations to TaskService.
 * - Map service results and errors to HTTP responses.
 * - Keep business rules outside the controller.
 *
 * -------------------------------------------------------------------
 */

import { Request, Response } from "express";
import { TaskService } from "../services/TaskService";
import { TaskStatus } from "../domain/task/TaskStatus";

export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  create = (req: Request, res: Response): void => {
    const { title, description } = req.body;

    if (!title) {
      res.status(400).json({
        message: "Title is required",
      });
      return;
    }

    const task = this.taskService.createTask(title, description);

    res.status(201).json(task);
  };

  list = (_req: Request, res: Response): void => {
    const tasks = this.taskService.listTasks();

    res.json(tasks);
  };

  transition = (req: Request, res: Response): void => {
    const { id } = req.params;
    const { status, actor } = req.body;

    if (typeof id !== "string") {
      res.status(400).json({
        message: "Invalid task id",
      });
      return;
    }

    try {
      const task = this.taskService.transitionTask(
        id,
        status as TaskStatus,
        actor,
      );

      res.json(task);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";

      if (message === "Task not found") {
        res.status(404).json({ message });
        return;
      }

      if (message.startsWith("Invalid transition")) {
        res.status(400).json({ message });
        return;
      }

      res.status(500).json({ message });
    }
  };

  auditLogs = (req: Request, res: Response): void => {
    const { id } = req.params;

    if (typeof id !== "string") {
      res.status(400).json({
        message: "Invalid task id",
      });
      return;
    }

    const logs = this.taskService.getAuditLogs(id);

    res.json(logs);
  };

  delete = (req: Request, res: Response): void => {
    const { id } = req.params;

    if (typeof id !== "string") {
      res.status(400).json({
        message: "Invalid task id",
      });
      return;
    }

    try {
      this.taskService.deleteTask(id);

      res.status(204).send();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";

      if (message === "Task not found") {
        res.status(404).json({ message });
        return;
      }

      res.status(500).json({ message });
    }
  };
}
