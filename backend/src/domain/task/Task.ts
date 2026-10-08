/*
 * -------------- Yoga Wilanda Documentation V.1.0.0 -----------------
 *
 * <meta_config>
 * Author__________________: yogawilanda <eayogawilanda@gmail.com>
 * Path____________________: backend\src\domain\task\Task.ts
 * Purpose_________________: Define the current state of a task entity
 * Version_________________: 1.0.0
 * Status__________________: active
 * </meta_config>
 *
 * Function               : Task Domain Model
 * Loc                    : Task.ts
 *
 * Responsibilities:
 * - Represent a task and its current state.
 * - Store task identity, content, status, and lifecycle timestamps.
 * - Provide the domain structure used by task operations.
 *
 * -------------------------------------------------------------------
 */


import { TaskStatus } from './TaskStatus';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}