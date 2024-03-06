"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { usePathname, useRouter } from "next/navigation";
import CustomToast, { showSuccessToast } from "../ui/customToast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { updateUserProfile } from "@/lib/actions/user.actions";

const EditCardValidation = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
  bio: z.string(),
});

const EditCard = ({
  id,
  userInfo: { name, username, bio },
}: {
  id: string | undefined;
  userInfo: { name: string; username: string; bio: string };
}) => {
  const form = useForm<z.infer<typeof EditCardValidation>>({
    resolver: zodResolver(EditCardValidation),
    defaultValues: {
      name,
      username,
      bio,
    },
  });
  
  const router = useRouter();
  const pathname = usePathname();
  // const userId = router.query.id; // Get the user ID from the URL

  const onSubmit = async (values: z.infer<typeof EditCardValidation>) => {
    console.log(values);

    // Here, you can add the logic to update the user information in MongoDB
    try {
      await updateUserProfile({
        userId: id || "", // Provide a default value of an empty string if id is undefined
        name: values.name,
        username: values.username,
        bio: values.bio,
        path: pathname,
      });

      // Handle success
      router.push(`/profile/${id}`);
      showSuccessToast("Details updated successfully!");

    } catch (error) {
      // Handle error
    }
  };

  return (
    <Form {...form}>
      <form
        className="mt-10 flex flex-col justify-start gap-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-1 text-light-1">
              <FormLabel>Name</FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 text-light-1">
              <FormLabel>Username</FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 text-light-1">
              <FormLabel>Bio</FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <CustomToast/>
        <Button type="submit" className="bg-primary-500">
          Save Changes
        </Button>
      </form>
    </Form>
  );
};

export default EditCard;
