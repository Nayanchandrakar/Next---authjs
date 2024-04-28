"use server";

import bcrypt from "bcryptjs";
import db from "@/lib/db";

import {
  registerFormSchema,
  registerFormSchemeType,
} from "@/schema/form-schema";
import { getUserByEmail } from "@/app/action/data";
import { generateVerificationToken } from "@/app/action/token";
import { sendVerificationEmail } from "@/app/action/email";

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

  // generate a verifictation token
  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(
    verificationToken?.token!,
    verificationToken?.email!
  );

  return { success: "An verification token is sent your email!" };
};
