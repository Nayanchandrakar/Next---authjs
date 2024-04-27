import * as z from "zod";

export const loginFormSchema = z.object({
  email: z.string().email().min(1, {
    message: "email is required",
  }),
  password: z.string().min(1, {
    message: "password is required!",
  }),
});

export type loginFormSchemaType = z.infer<typeof loginFormSchema>;

export const registerFormSchema = z.object({
  name: z.string().min(1, {
    message: "name is required",
  }),
  email: z.string().email().min(1, {
    message: "email is required",
  }),
  password: z.string().min(1, {
    message: "password is required!",
  }),
});

export type registerFormSchemeType = z.infer<typeof registerFormSchema>;
