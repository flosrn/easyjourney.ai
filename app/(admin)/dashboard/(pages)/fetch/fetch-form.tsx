"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

const accountFormSchema = z.object({
  inputValue: z.string(),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

const defaultValues: Partial<AccountFormValues> = {
  inputValue: "",
};

const fetchAPI = async (data: AccountFormValues) => {
  console.log("data :", data);
  const response = await fetch("/api/midjourney/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: data.inputValue }),
  });
  const responseData = await response.json();
  console.log("responseData :", responseData);
  if (responseData.status === 200) {
    toast.success(responseData.message);
  }
  if (responseData.status !== 200) {
    toast.error(responseData.message);
  }
  return responseData;
};

export const FetchForm = () => {
  const { data: session } = useSession();
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  const apiRouteMutation = useMutation({
    mutationFn: async () => fetchAPI(form.getValues()),
    onSuccess: (data) => {
      console.log("data :", data);
    },
  });

  const onSubmit = async () => {
    await apiRouteMutation.mutate();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="inputValue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>API Route</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                This is a description for the input.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Fetch API</Button>
      </form>
    </Form>
  );
};

export default FetchForm;
