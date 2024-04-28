import db from "@/lib/db";

import { getVerificationByToken } from "@/app/action/token";

export const verifyToken = async (token: string) => {
  try {
    const tokenData = await getVerificationByToken(token);

    console.log(token, tokenData);

    if (!tokenData) {
      return { error: "Token does not Exist" };
    }

    const hasExpired = new Date(tokenData.expires!) < new Date();

    if (hasExpired) {
      return { error: "Token has expired" };
    }

    const getExistingUser = await db?.user?.findFirst({
      where: {
        email: tokenData.email,
      },
    });

    if (!getExistingUser) {
      return { error: "Email has been changed" };
    }

    await db?.user?.update({
      where: {
        id: getExistingUser.id,
      },
      data: {
        emailVerified: new Date(),
        email: getExistingUser.email,
      },
    });

    await db?.verificationToken?.delete({
      where: {
        id: tokenData?.id,
      },
    });

    return { success: "Email verified" };
  } catch (error) {
    return null;
  }
};
