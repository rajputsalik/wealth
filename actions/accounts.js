"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";


const serializeTransaction = (obj) => {
  const serialized = { ...obj };

  if (obj.amount) serialized.amount = obj.amount.toNumber();
  if (obj.balance) serialized.balance = obj.balance.toNumber();

  return serialized;
};

export async function updateDefaultAccount(accountId) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("User not authenticated");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });
    if (!user) throw new Error("User not found in database");

    // ✅ Check if the account belongs to the user
    const account = await db.account.findUnique({
      where: { id: accountId },
    });
    if (!account || account.userId !== user.id) {
      throw new Error("Account not found or not authorized");
    }

    // ✅ Set all other accounts to false
    await db.account.updateMany({
      where: { userId: user.id, isDefault: true },
      data: { isDefault: false },
    });

    // ✅ Set this account to true
    const updatedAccount = await db.account.update({
      where: { id: accountId },
      data: { isDefault: true },
    });

    revalidatePath("/dashboard");

    return { status: "success", data: serializeTransaction(updatedAccount) };
  } catch (error) {
    console.error("Error updating default account:", error);
    return { status: "error", message: error.message || "Something went wrong" };
  }
}


export async function getAccountWithTransactions(accountId) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("User not authenticated");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });
    if (!user) throw new Error("User not found in database");

    // ✅ Check if the account belongs to the user
    const account = await db.account.findUnique({
      where: { id: accountId , userId: user.id},
      include: {
        transactions: {
            orderBy: { date: "desc" },
        },
        _count: {
            select: {
                transactions: true
            },
        },
      }
    });
    if (!account || account.userId !== user.id) {
      return null;  // Return null if account not found or not authorized
    }

    // ✅ Fetch transactions for the account
    const transactions = await db.transaction.findMany({
      where: { accountId: account.id },
    });

    return {
        ...serializeTransaction(account),
        transactions: account.transactions.map(serializeTransaction),
    };
  } catch (error) {
    console.error("Error fetching account with transactions:", error);
    return { status: "error", message: error.message || "Something went wrong" };
  }
}


export async function bulkDeleteTransactions(transactionIds) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("User not authenticated");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });
    if (!user) throw new Error("User not found in database");

    // ✅ Check if all transactions belong to the user
    const transactions = await db.transaction.findMany({
      where: { id: { in: transactionIds },  
      userId: user.id
      },
    });
        
    const accountBalanceChanges = transactions.reduce((acc, txn) => {
        const change = txn.type === "INCOME" ? -txn.amount.toNumber() : txn.amount.toNumber();
        
        acc[txn.accountId] = (acc[txn.accountId] || 0) + change;
        return acc;
    },{});

    if (transactions.length !== transactionIds.length) {
      throw new Error("Some transactions not found or not authorized");
    }

    // ✅ Delete the transactions
    
    await db.$transaction(async (tx) => {
        await tx.transaction.deleteMany({
            where: {
                id: { in: transactionIds },
                userId: user.id
            },
        });

        // Update account balances
        for (const [accountId, balanceChange] of Object.entries(
            accountBalanceChanges))
             {
            await tx.account.update({
                where: { id: accountId },
                data: {
                    balance: {
                        increment: balanceChange
                    },
                },
            });
        }
    });
    
    revalidatePath("/account/[id]");
    revalidatePath("/dashboard");

    return { status: "success", message: "Transactions deleted successfully" };
  } catch (error) {
    console.error("Error deleting transactions:", error);
    return { status: "error", message: error.message || "Something went wrong" };
  }
}