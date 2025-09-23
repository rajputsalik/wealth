"use client";

import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountSchema } from "@/app/lib/schema";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createAccount } from "@/actions/dashboard";

const CreateAccountDrawer = ({ children }) => {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      type: "SAVINGS",
      balance: "",
      isDefault: false,
    },
  });

  const {
    data: newAccount,
    error,
    fn: createAccountFn,
    loading: createAccountLoading,
  } = useFetch(createAccount);

  useEffect(() => {
    if (newAccount && !createAccountLoading) {
      toast.success("✅ Account created successfully");
      reset();
      setOpen(false);
    }
  }, [newAccount, createAccountLoading, reset]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "❌ Failed to create account");
    }
  }, [error]);

  const onSubmit = async (data) => {
    await createAccountFn(data);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="bg-gray-900 text-gray-200 border-t border-gray-700">
        <DrawerHeader>
          <DrawerTitle className="text-indigo-400 text-xl font-bold">
            Create New Account
          </DrawerTitle>
        </DrawerHeader>

        <div className="px-6 pb-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Account Name */}
            <div>
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-300"
              >
                Account Name
              </label>
              <Input
                id="name"
                placeholder="e.g., Family Account"
                className="bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-red-400">{errors.name.message}</p>
              )}
            </div>

            {/* Account Type */}
            <div>
              <label
                htmlFor="type"
                className="text-sm font-medium text-gray-300"
              >
                Account Type
              </label>
              <Select
                onValueChange={(value) => setValue("type", value)}
                defaultValue={watch("type")}
              >
                <SelectTrigger
                  id="type"
                  className="bg-gray-800 border-gray-700 text-gray-100"
                >
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
                  <SelectItem value="SAVINGS">Savings</SelectItem>
                  <SelectItem value="CURRENT">Current</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-sm text-red-400">{errors.type.message}</p>
              )}
            </div>

            {/* Balance */}
            <div>
              <label
                htmlFor="balance"
                className="text-sm font-medium text-gray-300"
              >
                Initial Balance
              </label>
              <Input
                id="balance"
                type="number"
                step="0.01"
                placeholder="0.00"
                className="bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500"
                {...register("balance", { valueAsNumber: true })}
              />
              {errors.balance && (
                <p className="text-sm text-red-400">
                  {errors.balance.message}
                </p>
              )}
            </div>

            {/* Default Switch */}
            <div className="flex items-center justify-between rounded-lg border border-gray-700 p-3">
              <div>
                <label
                  htmlFor="isDefault"
                  className="text-base font-medium text-gray-200 cursor-pointer"
                >
                  Set as Default
                </label>
                <p className="text-sm text-gray-400">
                  This account will be selected by default for transactions
                </p>
              </div>
              <Switch
                id="isDefault"
                checked={watch("isDefault")}
                onCheckedChange={(checked) => setValue("isDefault", checked)}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <DrawerClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  Cancel
                </Button>
              </DrawerClose>
              <Button
                type="submit"
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
                disabled={createAccountLoading}
              >
                {createAccountLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 w-4 h-4" /> Creating...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </div>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateAccountDrawer;
