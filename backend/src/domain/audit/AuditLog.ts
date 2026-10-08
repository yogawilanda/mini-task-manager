/*
 * -------------- Yoga Wilanda Documentation V.1.0.0 -----------------
 *
 * <meta_config>
 * Author__________________: yogawilanda <eayogawilanda@gmail.com>
 * Path____________________: backend\src\domain\audit\AuditLog.ts
 * Purpose_________________: Define the immutable record of a task status change
 * Version_________________: 1.0.0
 * Status__________________: active
 * </meta_config>
 *
 * Function               : Audit Log Domain Model
 * Loc                    : AuditLog.ts
 *
 * Responsibilities:
 * - Represent one historical status transition.
 * - Store the task, actor, previous status, new status, and timestamp.
 * - Provide the data structure used by the audit trail.
 *
 * -------------------------------------------------------------------
 */

import { TaskStatus } from "../task/TaskStatus";

export interface AuditLog {
	id: string,
	taskId: string,
	actor: string,
	fromStatus: TaskStatus,
	toStatus: TaskStatus,
	createdAt: Date,
}