import { z } from "zod";

export const ProjectSchema = z.object({
	name: z.string(),
	description: z.string().optional(),
	status: z.enum(["todo", "active", "done"]),
	priority: z.enum(["low", "medium", "high"]),
	start_date: z.coerce.date(),
	end_date: z.coerce.date(),
	is_archived: z.boolean().optional(),
	owner: z.string().uuid(),
	members: z.array(z.string().uuid()).optional(),
	tasks: z.any().optional(),
	is_personal: z.boolean().optional(),
});

export type ProjectSchemaType = z.infer<typeof ProjectSchema>;
