import db from "@/lib/db";
import type { User, verificationToken } from "@prisma/client";

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

// export const getVerificationTokenByEmail = async(): Promise<verificationToken | null> => {
//   try {
//     const res = await db?.verificationToken?.findUnique({
//       where:{
//         email;
//       }
//     })
//   } catch (error) {
//     return null
//   }
// }

// export const generateTokenByEmail = async (
//   email: string
// ): Promise<verificationToken | null> => {
//   try {

//     const isExist =

//   } catch (error) {
//     return null;
//   }
// };
