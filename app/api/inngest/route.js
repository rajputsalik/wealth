import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client";
import { checkBudgetAlerts , triggerRecurringTransactions , processRecurringTransaction, generateMonthlyReports } from "@/lib/inngest/functions";


// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  /* your functions will be passed here later! */
  functions: [
   checkBudgetAlerts,
    triggerRecurringTransactions,
    processRecurringTransaction,
    generateMonthlyReports
  ],
});