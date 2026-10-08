/*
 * -------------- Yoga Wilanda Documentation V.1.0.0 -----------------
 *
 * <meta_config>
 * Author_______________: yogawilanda <eayogawilanda@gmail.com>
 * Path_________________: frontend/src/App.tsx
 * Purpose______________: Orchestrate task management UI and API actions.
 * Version______________: 1.0.0
 * Status_______________: active
 * </meta_config>
 *
 * Function              : Render Task Manager Application
 * Loc                   : App.tsx
 *
 * -------------------------------------------------------------------
 */

import { useEffect, useState } from "react";
import { TaskForm } from "./components/TaskForm";
import { TaskItem } from "./components/TaskItem";
import {
  createTask,
  deleteTask,
  getAuditLogs,
  getTasks,
  updateTaskStatus,
} from "./api/taskApi";
import type { AuditLog, Task, TaskStatus } from "./types/task";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch {
        setError("Failed to load tasks.");
      }
    };

    void loadTasks();
  }, []);

  const handleCreateTask = async (
    title: string,
    description: string,
  ) => {
    try {
      setError(null);

      const task = await createTask(title, description);

      setTasks((currentTasks) => [...currentTasks, task]);
    } catch {
      setError("Failed to create task.");
    }
  };

  const handleStatusChange = async (
    taskId: string,
    status: TaskStatus,
  ) => {
    try {
      setError(null);

      const updatedTask = await updateTaskStatus(
        taskId,
        status,
        "yoga",
      );

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === taskId ? updatedTask : task,
        ),
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to update task.",
      );
    }
  };

  const handleDelete = async (taskId: string) => {
    try {
      setError(null);

      await deleteTask(taskId);

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== taskId),
      );

      if (selectedTaskId === taskId) {
        setSelectedTaskId(null);
        setAuditLogs([]);
      }
    } catch {
      setError("Failed to delete task.");
    }
  };

  const handleViewAudit = async (taskId: string) => {
    try {
      setError(null);

      const logs = await getAuditLogs(taskId);

      setSelectedTaskId(taskId);
      setAuditLogs(logs);
    } catch {
      setError("Failed to load audit history.");
    }
  };

  return (
    <main className="app">
      <header className="app-header">
        <h1>Task Manager</h1>
        <p>Manage tasks and track status changes.</p>
      </header>

      <section className="task-form-section">
        <TaskForm onSubmit={handleCreateTask} />
      </section>

      {error && <p className="error-message">{error}</p>}

      <section className="tasks-section">
        <h2>Tasks</h2>

        {tasks.length === 0 ? (
          <p className="empty-state">No tasks yet.</p>
        ) : (
          <div className="task-list">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
                onViewAudit={handleViewAudit}
              />
            ))}
          </div>
        )}
      </section>

      {selectedTaskId && (
        <div className="audit-modal-overlay" role="presentation">
          <section
            className="audit-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="audit-modal-title"
          >
            <div className="audit-modal-header">
              <div>
                <h2 id="audit-modal-title">Audit History</h2>
                <p>Task ID: {selectedTaskId}</p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedTaskId(null);
                  setAuditLogs([]);
                }}
              >
                Close
              </button>
            </div>

            {auditLogs.length === 0 ? (
              <p className="empty-state">No status changes yet.</p>
            ) : (
              <div className="audit-list">
                {auditLogs.map((log) => (
                  <article className="audit-item" key={log.id}>
                    <p>
                      <strong>
                        {log.fromStatus} → {log.toStatus}
                      </strong>
                    </p>
                    <p>Actor: {log.actor}</p>
                    <p>
                      {new Date(log.createdAt).toLocaleString()}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </main>
  );
}

export default App; 