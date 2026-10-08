/*
 * -------------- Yoga Wilanda Documentation V.1.0.0 -----------------
 *
 * <meta_config>
 * Author__________________: yogawilanda <eayogawilanda@gmail.com>
 * Path____________________: backend\src\domain\task\TaskStatus.ts
 * Purpose_________________: Define the allowed lifecycle states of a task
 * Version_________________: 1.0.0
 * Status__________________: active
 * </meta_config>
 *
 * Function               : Task Status Definition
 * Loc                    : TaskStatus.ts
 *
 * Responsibilities:
 * - Define the valid task status values.
 * - Provide a shared type for task state and transitions.
 *
 * -------------------------------------------------------------------
 */

export enum TaskStatus {
  TO_DO = 'to_do',
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}