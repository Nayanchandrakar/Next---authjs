"use server";
import { resetTypeSchemaType, resetFormSchema } from "@/schema/form-schema";
import { generatePasswordResetToken, getUserByEmail } from "@/app/action/data";
import { sendPasswordResetEmail } from "@/app/action/email";

export const ResetPassword = async (formData: resetTypeSchemaType) => {
  try {
    const validatedData = resetFormSchema?.safeParse(formData);
    if (!validatedData.success) {
      return { error: "No enough credentials" };
    }

    const { email } = validatedData.data;

    const userExist = await getUserByEmail(email);

    if (!userExist) {
      return { error: "Email Not found" };
    }

    const passwordToken = await generatePasswordResetToken(email);

    await sendPasswordResetEmail(passwordToken?.token!, passwordToken?.email!);

    return { success: "reset email sent" };
  } catch (error) {
    return { error: "Internal Server Error" };
  }
};
