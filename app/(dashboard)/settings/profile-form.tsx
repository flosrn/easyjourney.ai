"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/react-hook-form/form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";

import { cn } from "~/lib/classNames";

const profileFormSchema = z.object({
  name: z.string().min(2).max(30),
  bio: z.string().max(160).min(0).optional(),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const defaultValues: Partial<ProfileFormValues> = {
  name: "",
  bio: "",
  urls: [
    { value: "https://instagram.com/" },
    { value: "https://twitter.com/" },
    { value: "https://discord.com/" },
  ],
};

const ProfileForm = () => {
  const { data: session } = useSession();
  const username = session?.user.username;

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields, append } = useFieldArray({
    name: "urls",
    control: form.control,
  });

  const userInfo = useQuery({
    queryKey: ["userProfileInfo", username],
    queryFn: async () => {
      console.log("username from userinfo", username);
      const response = await fetch(
        `/api/profile/settings/read/profile?username=${username}`
      );
      const { data } = await response.json();
      return data;
    },
    enabled: !!username,
  });

  useEffect(() => {
    if (session && userInfo.data) {
      form.reset({
        name: session.user.name!,
        bio: userInfo.data?.bio,
        urls: [
          { value: userInfo.data.instagram, key: "instagram" },
          { value: userInfo.data.twitter, key: "twitter" },
          { value: userInfo.data.discord, key: "discord" },
        ],
      });
    }
  }, [session, userInfo.data]);

  console.log("userinfo", userInfo.data);

  const updateProfile = useMutation({
    mutationFn: async ({ data }) => {
      const response = await fetch("/api/profile/settings/update/profile", {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (response.status === 200) {
        toast.success(responseData.message);
      } else {
        toast.error(responseData.message);
      }
      return responseData;
    },
  });

  const onSubmit = (data: ProfileFormValues) => {
    console.log("datafront", data);
    // TODO: add logic to update profile
    const { name, bio, urls } = data;
    const keyedUrls = urls.map((url, index) => {
      let key;
      switch (index) {
        case 0:
          key = "instagram";
          break;
        case 1:
          key = "twitter";
          break;
        case 2:
          key = "discord";
          break;
        default:
          key = `url${index}`;
      }
      return { ...url, key };
    });
    updateProfile.mutate({ data: { name, bio, urls: keyedUrls } });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormDescription>
                This is the name that will be displayed on your profile and in
                emails.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your public bio. You can use it to tell others a little
                bit about yourself.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`urls.${index}.value`}
              // eslint-disable-next-line no-shadow
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    URLs
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                    Add links to your website, blog, or social media profiles.
                  </FormDescription>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
