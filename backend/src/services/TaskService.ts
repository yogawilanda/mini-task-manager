/*
 * -------------- Yoga Wilanda Documentation V.1.0.0 -----------------
 *
 * <meta_config>
 * Author__________________: yogawilanda <eayogawilanda@gmail.com>
 * Path____________________: backend\src\services\TaskService.ts
 * Purpose_________________: Manage task lifecycle and audit trail business logic
 * Version_________________: 1.0.0
 * Status__________________: active
 * </meta_config>
 *
 * Function               : Task Business Service
 * Loc                    : TaskService.ts
 *
 * Responsibilities:
 * - Create, list, transition, and delete tasks.
 * - Enforce valid task status transitions.
 * - Keep same-status updates idempotent.
 * - Record valid status changes in the audit trail.
 * - Keep task state and audit records consistent.
 *
 * -------------------------------------------------------------------
 */

import { Task } from "../domain/task/Task";
import { TaskStatus } from "../domain/task/TaskStatus";
import { canTransition } from "../domain/task/TaskTransition";
import { AuditLog } from "../domain/audit/AuditLog";

export class TaskService {
  private tasks: Task[] = [];
  private auditLogs: AuditLog[] = [];

  createTask(title: string, description?: string): Task {
    const now = new Date();

    const task: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      status: TaskStatus.TO_DO,
      createdAt: now,
      updatedAt: now,
    };

    this.tasks.push(task);

    return task;
  }

  transitionTask(
    taskId: string,
    newStatus: TaskStatus,
    actor: string,
  ): Task {
    const task = this.tasks.find((task) => task.id === taskId);

    if (!task) {
      throw new Error("Task not found");
    }

    if (task.status === newStatus) {
      return task;
    }

    const isValid = canTransition(task.status, newStatus);

    if (!isValid) {
      throw new Error(
        `Invalid transition: ${task.status} → ${newStatus}`,
      );
    }

    const previousStatus = task.status;

    task.status = newStatus;
    task.updatedAt = new Date();

    this.auditLogs.push({
      id: crypto.randomUUID(),
      taskId: task.id,
      actor,
      fromStatus: previousStatus,
      toStatus: newStatus,
      createdAt: new Date(),
    });

    return task;
  }

  listTasks(): Task[] {
    return this.tasks;
  }

  getAuditLogs(taskId: string): AuditLog[] {
    return this.auditLogs.filter((log) => log.taskId === taskId);
  }

  deleteTask(taskId: string): void {
    const index = this.tasks.findIndex((task) => task.id === taskId);

    if (index === -1) {
      throw new Error("Task not found");
    }

    this.tasks.splice(index, 1);
  }
}