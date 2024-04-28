"use server";
import db from "@/lib/db";
import { passwordSchema, passwordSchemaType } from "@/schema/form-schema";
import { getPasswordResetByToken, getUserByEmail } from "@/app/action/data";
import bcrypt from "bcryptjs";

export const newPasswordAction = async (
  formData: passwordSchemaType,
  token?: string | null
) => {
  try {
    if (!token) {
      return { error: "Token is Missing" };
    }

    const validateFields = passwordSchema.safeParse(formData);

    if (!validateFields?.success) {
      return { error: "Invalid Fields" };
    }

    const getTokenVerify = await getPasswordResetByToken(token);

    if (!getTokenVerify) {
      return { error: "Token not Exist" };
    }

    const hasExpires = new Date(getTokenVerify?.expires!) < new Date();

    if (hasExpires) {
      return { error: "Token has expired. " };
    }

    const user = await getUserByEmail(getTokenVerify?.email!);

    if (!user) {
      return { error: "No user Found" };
    }

    const hashedPassword = await bcrypt.hash(formData?.password!, 10);

    await db?.user?.update({
      where: {
        id: user?.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    await db?.passwordVerificationToken?.delete({
      where: {
        id: getTokenVerify?.id,
      },
    });

    return { success: "password reset succefully!" };
  } catch (error) {
    return { error: "Internal server error" };
  }
};
