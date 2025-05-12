import { z } from "zod";

export const RegisterSchema = z.object({
	email: z.string().email(),
	username: z.string(),
	password: z.string().min(8, {
		message: "Password must be at least 2 characters.",
	}),
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8, {
		message: "Password must be at least 2 characters.",
	}),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
