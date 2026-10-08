/*
 * -------------- Yoga Wilanda Documentation V.1.0.0 -----------------
 *
 * <meta_config>
 * Author_______________: yogawilanda <eayogawilanda@gmail.com>
 * Path_________________: frontend/src/components/TaskItem.tsx
 * Purpose______________: Display a task and provide task actions.
 * Version______________: 1.0.0
 * Status_______________: active
 * </meta_config>
 *
 * Function              : Render Task Item
 * Loc                   : TaskItem.tsx
 *
 * -------------------------------------------------------------------
 */

import type { Task, TaskStatus } from "../types/task";

interface TaskItemProps {
  task: Task;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
  onDelete: (taskId: string) => void;
  onViewAudit: (taskId: string) => void;
}

const nextStatuses: Record<TaskStatus, TaskStatus | null> = {
  to_do: "pending",
  pending: "in_progress",
  in_progress: "done",
  done: null,
};

export function TaskItem({
  task,
  onStatusChange,
  onDelete,
  onViewAudit,
}: TaskItemProps) {
  const nextStatus = nextStatuses[task.status];

  return (
    <article className="task-item">
      <div className="task-content">
        <h3>{task.title}</h3>

        {task.description && <p>{task.description}</p>}

        <span className="task-status">{task.status}</span>
      </div>

      <div className="task-actions">
        {nextStatus && (
          <button
            type="button"
            onClick={() => onStatusChange(task.id, nextStatus)}
          >
            Move to {nextStatus}
          </button>
        )}

        <button
          type="button"
          onClick={() => onViewAudit(task.id)}
        >
          Audit history
        </button>

        <button
          type="button"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}