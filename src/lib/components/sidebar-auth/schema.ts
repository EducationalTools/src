import { z } from 'zod';

export const signUpFormSchema = z.object({
	username: z.string().min(2).max(50)
});

export const signInFormSchema = z.object({
	username: z.string().min(2).max(50)
});

export type SignUpAccountFormSchema = typeof signUpFormSchema;
export type SignInFormSchema = typeof signInFormSchema;
