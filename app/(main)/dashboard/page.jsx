import React from "react";
import CreateAccountDrawer from "@/components/create-account-drawer";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { getUserAccounts } from "@/actions/dashboard";
import AccountCard from "./_components/account-card";
import { getCurrentBudget } from "@/actions/budget";
import  { BudgetProgress }  from "./_components/budget-progress";
import { getDashboardData } from "@/actions/dashboard";
import { DashboardOverview } from "./_components/transaction-overview";


export default async function DashboardPage(){

    const accounts = await getUserAccounts();

    const defaultAccount = accounts?.find((account) => account.isDefault);

    // Get budget for default account
    let budgetData = null;
    if (defaultAccount) {
        budgetData = await getCurrentBudget(defaultAccount.id);
    }

    const transactions = await getDashboardData();

    return (
        <div className="space-y-4  ">
        
            {/* {budget progress } */}
            {defaultAccount && (
            <BudgetProgress
        initialBudget={budgetData?.budget}
        currentExpenses={budgetData?.currentExpenses || 0}
      />
      )}

      
            


            {/* {overview } */}
           <DashboardOverview
        accounts={accounts}
        transactions={transactions || []}
      />


            {/* {Account grid } */}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
                <CreateAccountDrawer>
                    <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                        <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-full pt-5">
                            <Plus className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer mb-2" />
                            <p className="text-gray-500 hover:text-gray-700 cursor-pointer">Add New Account</p>
                        </CardContent>
                    </Card>
                </CreateAccountDrawer>

                {accounts.length > 0 && accounts?.map((account) => {
                    return <AccountCard key={account.id} account={account} />
                })}
            </div>
        </div>
    );
};



// grid gap-4 md:grid-cols-2 lg:grid-cols-3