/*
 * -------------- Yoga Wilanda Documentation V.1.0.0 -----------------
 *
 * <meta_config>
 * Author_______________: yogawilanda <eayogawilanda@gmail.com>
 * Path_________________: frontend/src/components/TaskForm.tsx
 * Purpose______________: Provide a form for creating a new task.
 * Version______________: 1.0.0
 * Status_______________: active
 * </meta_config>
 *
 * Function              : Render Task Creation Form
 * Loc                   : TaskForm.tsx
 *
 * -------------------------------------------------------------------
 */
import { useState } from "react";
import type { FormEvent } from "react";

interface TaskFormProps {
  onSubmit: (title: string, description: string) => void;
}

export function TaskForm({ onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    onSubmit(title.trim(), description.trim());

    setTitle("");
    setDescription("");
  };

  return (
  <form className="task-form" onSubmit={handleSubmit}>
    <div className="form-field">
      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Task title"
      />
    </div>

    <div className="form-field">
      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Task description"
      />
    </div>

    <button className="primary-button" type="submit">
      Create task
    </button>
  </form>
);
}