/*
 * -------------- Yoga Wilanda Documentation V.1.0.0 -----------------
 *
 * <meta_config>
 * Author_______________: yogawilanda <eayogawilanda@gmail.com>
 * Path_________________: frontend/src/api/taskApi.ts
 * Purpose______________: Provide API communication for task operations.
 * Version______________: 1.0.0
 * Status_______________: active
 * </meta_config>
 *
 * Function              : Task API Client
 * Loc                   : taskApi.ts
 *
 * -------------------------------------------------------------------
 */

import type { AuditLog, Task, TaskStatus } from "../types/task";

const API_URL = "http://localhost:3000/api";

export async function getTasks(): Promise<Task[]> {
  const response = await fetch(`${API_URL}/tasks`);

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return response.json();
}

export async function createTask(
  title: string,
  description?: string,
): Promise<Task> {
  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      description,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create task");
  }

  return response.json();
}

export async function updateTaskStatus(
  taskId: string,
  status: TaskStatus,
  actor: string,
): Promise<Task> {
  const response = await fetch(`${API_URL}/tasks/${taskId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status,
      actor,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message ?? "Failed to update task status");
  }

  return response.json();
}

export async function getAuditLogs(
  taskId: string,
): Promise<AuditLog[]> {
  const response = await fetch(
    `${API_URL}/tasks/${taskId}/audit-logs`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch audit logs");
  }

  return response.json();
}

export async function deleteTask(taskId: string): Promise<void> {
  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }
}