"use server";
import { loginFormSchema, loginFormSchemaType } from "@/schema/form-schema";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/app/action/data";
import { generateVerificationToken } from "@/app/action/token";
import { sendVerificationEmail } from "@/app/action/email";

export const loginAction = async (formData: loginFormSchemaType) => {
  const validateFields = loginFormSchema.safeParse(formData);

  if (!validateFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validateFields.data;

  const user = await getUserByEmail(email);

  if (!user || !user?.email || !user?.password) {
    return { error: "Email not validated" };
  }

  if (!user?.emailVerified) {
    const generateToken = await generateVerificationToken(user.email!);

    await sendVerificationEmail(generateToken?.token!, generateToken?.email!);

    return { success: "Confirmation email Sent" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
  return { error: "Something went wrong!" };
};
