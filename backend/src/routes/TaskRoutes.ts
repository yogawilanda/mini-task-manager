/*
 * -------------- Yoga Wilanda Documentation V.1.0.0 -----------------
 * <meta_config>
 * Author_______________: yogawilanda <eayogawilanda@gmail.com>
 * Path_________________: backend/src/routes/TaskRoutes.ts
 * Purpose______________: Backend Routings
 * 				- Init Routes, Instantiate TaskService, 
 * 				- TaskController, Get & Set Post Instantiation.
 * Version______________: 1.0.0
 * Status_______________: active
 * </meta_config>
 *
 * Function             : Define Task CRUD & Status Routes
 * Loc                  : TaskRoutes.ts
 * -------------------------------------------------------------------
 */

import { Router } from "express";

import { TaskController } from "../controllers/TaskController";
import { TaskService } from "../services/TaskService";

const router = Router();

const taskService = new TaskService();
const taskController = new TaskController(taskService);

router.post("/tasks", taskController.create);
router.get("/tasks", taskController.list);

router.patch("/tasks/:id/status", taskController.transition);

router.get("/tasks/:id/audit-logs", taskController.auditLogs);

router.delete("/tasks/:id", taskController.delete);

export default router;