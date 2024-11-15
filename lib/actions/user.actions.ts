"use server";

import { ID, Query } from "node-appwrite";
import { appwriteConfig } from "../appwrite/config";
import { createAdminClient } from "../appwrite";
import { parseStringify } from "../utils";
import { cookies } from "next/headers";

const getUserByEmail = async (email: string) => {
  const { databases } = await createAdminClient();
  const result = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
    [Query.equal("email", [email])]
  );

  return result.total > 0 ? result.documents[0] : null;
};

const handleError = (error: unknown, message: string) => {
  console.log(error, message);
  throw error;
};

export const sendEmailOTP = async ({ email }: { email: string }) => {
  const { account } = await createAdminClient();
  try {
    const session = await account.createEmailToken(ID.unique(), email);
    return session.userId;
  } catch (error) {
    handleError(error, "Failed to send email OTP");
  }
};

export const createAccount = async ({
  fullName,
  email,
}: {
  fullName: string;
  email: string;
}) => {
  const existingUser = await getUserByEmail(email);

  const accountId = await sendEmailOTP({ email });
  if (!accountId) throw new Error("Failed to send OTP");

  if (!existingUser) {
    const { databases } = await createAdminClient();
    try {
      await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        ID.unique(),
        {
          fullName,
          email,
          accountId,
        },
      );
    } catch (error) {
      handleError(error, "Failed to create account");
    }
  }
  return parseStringify({ accountId });
};

export const verifySecret = async ({ accountId, password }: { accountId: string; password: string }) => {
  try {
    const { account } = await createAdminClient();

    const session = await account.createSession(accountId, password);

    (await cookies()).set('appwrite-session', session.$id, {
      path : '/',
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
   });

   return parseStringify({sessionId: session.$id});

  } catch (error) {
    handleError(error, "Failed to verify OTP");
  }
  

}; 