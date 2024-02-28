"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UploadButton } from "@/lib/uploadthing";
import { UserValidation } from "@/lib/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "../ui/textarea";
import { usePathname, useRouter } from "next/navigation";
import { updateUser } from "@/lib/actions/user.actions";
interface Props {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    isRecruiter: boolean;
    bio: string;
    image: string;
  };
  btnTitle: string;
}

const AccountProfile = ({ user, btnTitle }: Props) => {
  const [files, setFiles] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const [isRecruiter, setIsRecruiter] = useState(false);

  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: user?.image || "",
      name: user?.name || "",
      username: user?.username || "",
      bio: user?.bio || "",
      isRecruiter: user?.isRecruiter || false,
    },
  });

  const onSubmit = async (values: z.infer<typeof UserValidation>) => {
    console.log(values);

    //TODO: Update user profile
    await updateUser({
      userId: user.id,
      username: values.username,
      name: values.name,
      isRecruiter: values.isRecruiter,
      bio: values.bio,
      image: values.profile_photo,
      path: pathname,
    });

    if (pathname === "/profile/edit") {
      router.back();
    } else {
      router.push("/");
    }

  }

  //TODO: Add FormMessage for at every form input
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10"
      >
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="account-form_image-label">
                {field.value ? (
                  <Image
                    src={field.value}
                    alt="profile_icon"
                    width={96}
                    height={96}
                    priority
                    className="rounded-full object-contain"
                  />
                ) : (
                  <Image
                    src="/assets/profile.svg"
                    alt="profile_icon"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                )}
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res: any) => {
                    // Do something with the response
                    console.log("Files: ", res);
                    setFiles(res[0].url);
                    field.onChange(res[0].url);
                  }}
                  onUploadError={(error: Error) => {
                    // Do something with the error.
                    console.log("Error during upload: ", error);
                  }}
                  className="ut-button:bg-[#6c47ff] ut-button:text-white"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex gap-3 flex-col w-full">
              <FormLabel className="text-base-semibold text-light-2">
                Name
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input
                  type="text"
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

<FormField
  control={form.control}
  name="isRecruiter"
  render={({ field }) => (

    <FormItem className="flex gap-3 flex-row w-full">
      <FormLabel className="text-base-semibold text-light-2 mt-3">
        
        Are you a recruiter?
      </FormLabel>
      <FormControl>
        <Input
          className="flex w-5 h-5"
          type="checkbox"
          {...field}
          checked={!!field.value} // Convert field.value to a boolean
          onChange={(e) => field.onChange(e.target.checked)} // Convert the event value to a boolean
        />
      </FormControl>

    </FormItem>
  )}
/>

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex gap-3 flex-col w-full">
              <FormLabel className="text-base-semibold text-light-2">
                Username
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex gap-3 flex-col w-full">
              <FormLabel className="text-base-semibold text-light-2">
                Bio
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={10}
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-primary-500">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AccountProfile;
