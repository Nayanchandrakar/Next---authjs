"use server";
import { loginFormSchema, loginFormSchemaType } from "@/schema/form-schema";

export const loginAction = async (formData: loginFormSchemaType) => {
  const validateFields = loginFormSchema.safeParse(formData);

  if (!validateFields.success) {
    return { error: "Invalid fields" };
  }

  return { success: "succefully sent token" };
};
