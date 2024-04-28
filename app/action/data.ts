import db from "@/lib/db";
import type { User } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const data = await db?.user?.findFirst({
      where: {
        email,
      },
    });

    return data;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const data = await db?.user?.findFirst({
      where: {
        id,
      },
    });

    return data;
  } catch (error) {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const token = await db?.passwordVerificationToken?.findFirst({
      where: {
        email,
      },
    });

    return token;
  } catch (error) {
    return null;
  }
};

export const getPasswordResetByToken = async (token: string) => {
  try {
    const data = await db?.passwordVerificationToken?.findUnique({
      where: {
        token,
      },
    });

    return data;
  } catch (error) {
    return null;
  }
};

export const generatePasswordResetToken = async (email: string) => {
  try {
    const tokenExist = await getPasswordResetTokenByEmail(email);

    if (tokenExist) {
      await db?.passwordVerificationToken?.delete({
        where: {
          id: tokenExist?.id,
        },
      });
    }

    // generates a unique token
    const token = uuidv4();

    // token expires at duration of 1 hour
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const newToken = await db?.passwordVerificationToken?.create({
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
