import { getAccountWithTransactions } from '@/actions/accounts';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';
import { TransactionTable } from '../_components/transaction-table'; // named import
import AccountChart from '../_components/account-chart'; // default import

function Skeleton() {
  return (
    <div className="animate-pulse space-y-3">
      <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
      <div className="h-6 w-2/3 bg-gray-200 rounded"></div>
      <div className="h-6 w-1/2 bg-gray-200 rounded"></div>
    </div>
  );
}

export default async function AccountPage({ params }) {
  const { id } = await params; 

  const accountData = await getAccountWithTransactions(id);
  if (!accountData) {
    notFound();
  }

  const { transactions, ...account } = accountData;

  return (
    <div className="space-y-8 px-5">
      <div className="flex gap-4 items-end justify-between">
        <div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight gradient-title capitalize">
            {account.name}
          </h1>
          <p className="text-muted-foreground">
            {account.type.charAt(0) + account.type.slice(1).toLowerCase()} Account
          </p>
        </div>

        <div className="text-right pb-2">
          <div className="text-xl sm:text-2xl font-bold">
            ${parseFloat(account.balance).toFixed(2)}
          </div>
          <p className="text-sm text-muted-foreground">
            {account._count.transactions} Transactions
          </p>
        </div>
      </div>

      {/* Chart Section Here */}

      <Suspense fallback={<Skeleton />}>
      <AccountChart transactions={transactions} />
      </Suspense>





      {/* Transaction Table Here */}
      <Suspense fallback={<Skeleton />}>
        <TransactionTable transactions={transactions} />
      </Suspense>
    </div>
  );
}
