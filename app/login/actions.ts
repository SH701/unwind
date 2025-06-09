"use server";

import { z } from "zod";

function emailZod(email: string): boolean {
  return email.toLowerCase().endsWith("@zod.com");
}
function passwordZod(password: string): boolean {
  return /\d/.test(password);
}

const formSchema = z.object({
  email: z.string().email().refine(emailZod, { message: "Only @zod.com emails are allowed" }),
  username: z.string().min(5, { message: "Username should be at least 5 characters long." }),
  password: z.string().min(10, { message: "Password should be at least 10 characters long." }).refine(passwordZod, { message: "Password should contain at least one number (0123456789)" }),
});

type FormSchema = typeof formSchema;
export type FormFields = z.inferFlattenedErrors<FormSchema>;

export type LoginState = 
  | { success: true; message: string }
  | { success: false; fieldErrors: FormFields["fieldErrors"] };

export async function Login(prevState: LoginState, formData: FormData): Promise<LoginState> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const data = {
    email: formData.get("email")?.toString() || "",
    username: formData.get("username")?.toString() || "",
    password: formData.get("password")?.toString() || "",
  };
  const result = formSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      fieldErrors: result.error.flatten().fieldErrors,
    };
  } else {
    return {
      success: true,
      message: "Welcome back!",
    };
  }
}
