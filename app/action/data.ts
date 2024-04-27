import db from "@/lib/db";
import { User } from "@prisma/client";

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
