/*
 * -------------- Yoga Wilanda Documentation V.1.0.0 -----------------
 *
 * <meta_config>
 * Author__________________: yogawilanda <eayogawilanda@gmail.com>
 * Path____________________: backend\src\domain\task\TaskTransition.ts
 * Purpose_________________: Define and validate allowed task status transitions
 * Version_________________: 1.0.0
 * Status__________________: active
 * </meta_config>
 *
 * Function               : Task Status Transition Rules
 * Loc                    : TaskTransition.ts
 *
 * Responsibilities:
 * - Define valid transitions between task statuses.
 * - Validate whether a requested status transition is allowed.
 *
 * -------------------------------------------------------------------
 */


import { TaskStatus } from './TaskStatus';

const VALID_TRANSITIONS: Record<TaskStatus, TaskStatus[]> = {
  [TaskStatus.TO_DO]: [TaskStatus.PENDING],
  [TaskStatus.PENDING]: [TaskStatus.IN_PROGRESS],
  [TaskStatus.IN_PROGRESS]: [TaskStatus.DONE],
  [TaskStatus.DONE]: [],
};

export function canTransition(
  from: TaskStatus,
  to: TaskStatus,
): boolean {
  return VALID_TRANSITIONS[from].includes(to);
}