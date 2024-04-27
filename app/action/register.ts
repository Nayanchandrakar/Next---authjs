"use server";

import bcrypt from "bcryptjs";
import db from "@/lib/db";

import {
  registerFormSchema,
  registerFormSchemeType,
} from "@/schema/form-schema";
import { getUserByEmail } from "./data";

export const registerAction = async (formData: registerFormSchemeType) => {
  const validateFields = registerFormSchema.safeParse(formData);

  if (!validateFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, name, password } = validateFields?.data;

  const user = await getUserByEmail(email);

  if (user) {
    return { error: "Email already in use." };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db?.user?.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  return { success: "An verification email is sent to your email" };
};
