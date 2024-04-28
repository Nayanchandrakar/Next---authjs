import db from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const token = await db?.verificationToken?.findFirst({
      where: {
        email,
      },
    });

    return token;
  } catch (error) {
    return null;
  }
};

export const getVerificationByToken = async (token: string) => {
  try {
    const data = await db?.verificationToken?.findUnique({
      where: {
        token,
      },
    });

    return data;
  } catch (error) {
    return null;
  }
};

export const generateVerificationToken = async (email: string) => {
  try {
    const tokenExist = await getVerificationTokenByEmail(email);

    if (tokenExist) {
      await db?.verificationToken?.delete({
        where: {
          id: tokenExist?.id,
        },
      });
    }

    // generates a unique token
    const token = uuidv4();

    // token expires at duration of 1 hour
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const newToken = await db?.verificationToken?.create({
      data: {
        email,
        token,
        expires,
      },
    });

    return newToken;
  } catch (error) {
    return null;
  }
};
