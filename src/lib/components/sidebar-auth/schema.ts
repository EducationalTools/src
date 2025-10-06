import { z } from 'zod';

export const signUpFormSchema = z.object({
	displayName: z.string().min(2),
	email: z.email(),
	password: z.string().min(6)
});

export const signInFormSchema = z.object({
	email: z.email(),
	password: z.string()
});

export type SignUpAccountFormSchema = typeof signUpFormSchema;
export type SignInFormSchema = typeof signInFormSchema;
