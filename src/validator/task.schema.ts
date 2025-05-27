import { z } from "zod";

export const TaskSchema = z.object({
	userId: z.string(),
	title: z.string(),
	description: z.string(),
	priority: z.enum(["low", "medium", "high", "urgent"]),
	due_date: z.date(),
	status: z.enum(["todo", "doing", "done"]),
	projectId: z.any(),
});

export type TaskSchemaType = z.infer<typeof TaskSchema>;
