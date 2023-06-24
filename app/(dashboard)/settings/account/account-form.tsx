"use client";

import { useEffect } from "react";
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
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  // dob: z.date({
  //   required_error: "A date of birth is required.",
  // }),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

const defaultValues: Partial<AccountFormValues> = {
  username: "",
  // dob: new Date(),
};

export const AccountForm = () => {
  const { data: session } = useSession();
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  useEffect(() => {
    if (session) {
      form.reset({
        username: session.user.username,
        // dob: session.user.dateOfBirth
        //   ? new Date(session.user.dateOfBirth)
        //   : undefined,
      });
    }
  }, [session, form]);

  const updateUsernameMutation = useMutation({
    mutationFn: async (data: { username: string }) => {
      const response = await fetch("/api/profile/settings/update/account", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (responseData.status === 200) {
        toast.success(responseData.message);
      }
      if (responseData.status !== 200) {
        toast.error(responseData.message);
      }
      return responseData();
    },
  });

  const onSubmit = (data: AccountFormValues) => {
    const { username } = data;
    updateUsernameMutation.mutate({ username });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Your username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/*<FormField*/}
        {/*  control={form.control}*/}
        {/*  name="dob"*/}
        {/*  render={({ field }) => (*/}
        {/*    <FormItem className="flex flex-col">*/}
        {/*      <FormLabel>Date of birth</FormLabel>*/}
        {/*      <Popover>*/}
        {/*        <PopoverTrigger asChild>*/}
        {/*          <FormControl>*/}
        {/*            <Button*/}
        {/*              variant={"outline"}*/}
        {/*              className={cn("w-[240px] pl-3 text-left font-normal")}*/}
        {/*            >*/}
        {/*              {(field.value as Date | undefined) ? (*/}
        {/*                format(field.value, "MMMM d, yyyy")*/}
        {/*              ) : (*/}
        {/*                <span className="opacity-50">Select a date</span>*/}
        {/*              )}*/}
        {/*              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />*/}
        {/*            </Button>*/}
        {/*          </FormControl>*/}
        {/*        </PopoverTrigger>*/}
        {/*        <PopoverContent className="w-auto p-0" align="start">*/}
        {/*          <Calendar*/}
        {/*            mode="single"*/}
        {/*            selected={field.value}*/}
        {/*            onSelect={field.onChange}*/}
        {/*            disabled={(date) =>*/}
        {/*              date > new Date() || date < new Date("1900-01-01")*/}
        {/*            }*/}
        {/*            initialFocus*/}
        {/*          />*/}
        {/*        </PopoverContent>*/}
        {/*      </Popover>*/}
        {/*      <FormDescription>*/}
        {/*        Your date of birth is used to calculate your age.*/}
        {/*      </FormDescription>*/}
        {/*      <FormMessage />*/}
        {/*    </FormItem>*/}
        {/*  )}*/}
        {/*/>*/}
        <Button type="submit">Update account</Button>
      </form>
    </Form>
  );
};

export default AccountForm;
