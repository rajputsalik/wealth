"use client"

import { createTransaction ,updateTransaction  } from '@/actions/transcation'
import useFetch from '@/hooks/use-fetch'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { use } from 'react'
import { useForm } from 'react-hook-form'
import { transactionSchema } from '@/app/lib/schema'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, label } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import CreateAccountDrawer from '@/components/create-account-drawer'
import { Popover, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'
import { PopoverContent } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { CalendarIcon } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { Loader2 } from 'lucide-react'
import { useRouter , useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { useEffect } from 'react'
import  {ReceiptScanner}  from "./recipt-scanner";




const AddTransactionForm = ({ accounts, categories , editMode = false , initialData = null,
 }) => {

  const router = useRouter();
   const searchParams = useSearchParams();
   const editId = searchParams.get("edit");

  const { register,
    setValue,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    reset,
  } = useForm({
    resolver: zodResolver(transactionSchema),

    defaultValues:
     editMode && initialData?{
         type: initialData.type,
            amount: initialData.amount.toString(),
            description: initialData.description,
            accountId: initialData.accountId,
            category: initialData.category,
            date: new Date(initialData.date),
            isRecurring: initialData.isRecurring,
            ...(initialData.recurringInterval && {
              recurringInterval: initialData.recurringInterval,
            }),
     }:{
      type: "EXPENSE",
      amount: "",
      description: "",
      accountId: accounts.find((ac) => ac.isDefault)?.id,
      date: new Date(),
      isRecurring: false,
    },
  });

  const {
    loading: transactionLoading,
    fn: transactionFn,
    data: transactionResult
  } = useFetch(editMode ? updateTransaction : createTransaction)


   const onSubmit = async (data) => {
   const formData = {
      ...data,
      amount: parseFloat(data.amount),
    };

if (editMode) {
      transactionFn(editId, formData);
    } else {
      transactionFn(formData);
    }
  };



  const type = watch("type");
  const isRecurring = watch("isRecurring");
  const date = watch("date");

  const filteredCategories = categories.filter(
    (category) => category.type === type
  );

  

    

   useEffect(() => {
    if (transactionResult?.success && !transactionLoading) {
      toast.success( 
        editMode 
        ?  `Transaction updated successfully`
        : `Transaction created successfully`
      );

      reset();
      router.push(`/account/${transactionResult.data.accountId}`); // Redirect to account details page

    }
  }, [transactionResult, transactionLoading ,editMode]);

  const handleScanComplete = (scannedData) => {
   if (scannedData) {
     setValue("amount", scannedData.amount.toString());
     setValue("date", new Date(scannedData.date));
     if(scannedData.description){
       setValue("description", scannedData.description);
      }
       if(scannedData.category){
     setValue("category", scannedData.category);
       }
    
  }
};

  return (
    <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>

      {/* AI recipt Scanner */}

     {!editMode && <ReceiptScanner onScanComplete={handleScanComplete}/>}

      {/* Type */}

      <div className='space-y-2'>
        <label className='text-sm font-medium'>Type</label>
        <Select onValueChange={(value) => setValue("type", value)} defaultValue={type}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="INCOME">Income</SelectItem>
            <SelectItem value="EXPENSE">Expense</SelectItem>
          </SelectContent>
        </Select>
        {errors.type && <p className='text-sm text-red-500'>{errors.type.message}</p>}
      </div>
       
       {/* Amount and Account */}
      
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='space-y-2'>
          <label className='text-sm font-medium'>Amount</label>

          <Input
            type='number'
            step='0.01'
            placeholder='0.00'
            {...register("amount")}
          />

          {errors.amount && <p className='text-sm text-red-500'>{errors.amount.message}</p>}
        </div>

        <div className='space-y-2'>
          <label className='text-sm font-medium'>Account</label>
          <Select onValueChange={(value) => setValue("accountId", value)} defaultValue={getValues("accountId")}>

            <SelectTrigger>
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent>
              {accounts.map((account) => (
                <SelectItem key={account.id} value={account.id}>
                  {account.name} (${parseFloat(account.balance).toFixed(2)})
                </SelectItem>
              ))}

              <CreateAccountDrawer>
                <Button variant="ghost"
                  className="w-full select-none items-center justify-center rounded-md border border  border-primary/50 bg-primary/10 text-sm text-primary hover:bg-primary/20"
                >Create Account</Button>
              </CreateAccountDrawer>

            </SelectContent>
          </Select>

          {errors.accountId && <p className='text-sm text-red-500'>{errors.accountId.message}</p>}
        </div>
      </div>

           {/* Category */}

      <div className='space-y-2'>
        <label className='text-sm font-medium'>Category</label>
        <Select onValueChange={(value) => setValue("category", value)} defaultValue={getValues("category")}>

          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {filteredCategories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {errors.category && <p className='text-sm text-red-500'>{errors.category.message}</p>}
      </div>

        {/* Date */} 

          <div className='space-y-2'>
             <label className='text-sm font-medium'>Date</label>
            
            <Popover>
              <PopoverTrigger asChild>
               <Button variant="outline" className={`w-full pl-3 text-left font-medium`} >
                {date ? format(date , "PPP") : <span>Pick a date </span>}
                <CalendarIcon
                  className={"ml-auto h-4 w-4 opacity-50"}
                />
               </Button>
              </PopoverTrigger>
              <PopoverContent className={"w-auto p-0"} align="start"> 
                <Calendar
                  mode='single'
                  selected={date}
                  onSelect={(date) => setValue("date", date)}
                  disabled = {(date) => date > new Date() || date< new Date("1900-01-01")}

                  initialFocus
                />
              </PopoverContent>
            </Popover>

        {errors.date && <p className='text-sm text-red-500'>{errors.date.message}</p>}
      </div>
         
          {/* Description */}

      <div className='space-y-2'>
        <label className='text-sm font-medium'>Description</label>
        <Input
          className={"text-sm font-medium"}
          type='text'
          placeholder='Enter Description (optional)'
          {...register("description")}
        />
        {errors.description && <p className='text-sm text-red-500'>{errors.description.message}</p>}
      </div>
       
      <div className="flex items-center justify-between rounded-lg border border-gray-700 p-3">
              <div className="space-y-0.5">
                <label
                  className="text-base font-medium cursor-pointer"
                >
                  Recurring Transaction 
                </label>
                <p className="text-sm  text-muted-foreground">
                 Set up a recurring schedule for this transaction
                </p>
              </div>
              <Switch
                checked={isRecurring}
                onCheckedChange={(checked) => setValue("isRecurring", checked)}
              />
            </div>

       {/* Recurring Interval */}
      {isRecurring && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Recurring Interval</label>
          <Select
            onValueChange={(value) => setValue("recurringInterval", value)}
            defaultValue={getValues("recurringInterval")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select interval" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DAILY">Daily</SelectItem>
              <SelectItem value="WEEKLY">Weekly</SelectItem>
              <SelectItem value="MONTHLY">Monthly</SelectItem>
              <SelectItem value="YEARLY">Yearly</SelectItem>
            </SelectContent>
          </Select>
          {errors.recurringInterval && (
            <p className="text-sm text-red-500">
              {errors.recurringInterval.message}
            </p>
          )}
        </div>
      )}

       {/* Actions */}
      <div className="flex gap-6 justify-end pt-4 ">
        <Button
          type="button"
          variant="outline"
          className="w-[180px] cursor-pointer hover:scale-105 transition-transform"
          onClick={() => router.back()}
        >
          Cancel
        </Button>

        <Button type="submit" className="w-[150px] cursor-pointer hover:scale-105 transition-transform" disabled={transactionLoading}>
          {transactionLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {editMode ? "Updating..." : "Creating..."}
            </>
          ) : editMode ? (
            "Update Transaction"
          ) : (
            "Create Transaction"
          )}
        </Button>

          {transactionLoading && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <div className="flex flex-col items-center space-y-4">
      <Loader2 className="h-10 w-10 animate-spin text-white" />
      <p className="text-white text-lg font-medium">Creating transaction...</p>
    </div>
  </div>
)}
       
      </div>
    </form>
            
     

  )
}

export default AddTransactionForm;



 