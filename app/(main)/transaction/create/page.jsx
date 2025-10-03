import { getUserAccounts } from "@/actions/dashboard";
import { defaultCategories } from "@/data/categories";
import  AddTransactionForm  from "../_components/transaction-form";
import  { getTransaction } from "@/actions/transcation";
import { Suspense } from "react";
import { BarLoader } from "react-spinners";



export default async function AddTransactionPage({ searchParams }) {
  const accounts = await getUserAccounts();
  const params = await searchParams;
  const editId = params?.edit ?? null;

     let initialData = null;
     if (editId) {
    const transaction = await getTransaction(editId);
    initialData = transaction;
  }
 

  return (
    <div className="max-w-3xl mx-auto px-5">
      <div className="flex justify-center md:justify-normal mb-8">
        <h1 className="text-5xl gradient-title ">{editId ? "Edit Transaction" : "Add Transaction"}</h1>
      </div>
       <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
      >
      <AddTransactionForm
        accounts={accounts}
        categories={defaultCategories}
        editMode={!!editId}
        initialData={initialData}
      />
        </Suspense>

    </div>
  );
}
