/*
 * -------------- Yoga Wilanda Documentation V.1.0.0 -----------------
 *
 * <meta_config>
 * Author_______________: yogawilanda <eayogawilanda@gmail.com>
 * Path_________________: frontend/src/types/task.ts
 * Purpose______________: Define task and audit domain types for frontend.
 * Version______________: 1.0.0
 * Status_______________: active
 * </meta_config>
 *
 * Function              : Define Task Types
 * Loc                   : task.ts
 *
 * -------------------------------------------------------------------
 */

export type TaskStatus =
  | "to_do"
  | "pending"
  | "in_progress"
  | "done";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

export interface AuditLog {
  id: string;
  taskId: string;
  actor: string;
  fromStatus: TaskStatus;
  toStatus: TaskStatus;
  createdAt: string;
}