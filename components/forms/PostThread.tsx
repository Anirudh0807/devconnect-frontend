"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useOrganization } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";
import { Input } from "../ui/input";
import { useState } from "react";

interface Props {
  userId: string;
}

function PostThread({ userId }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { organization } = useOrganization();

  const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      tags: [],
      tag: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    values.tags = tags;

    await createThread({
      text: values.thread,
      author: userId,
      communityId: organization ? organization.id : null,
      tags: values.tags,
      path: pathname,
    });
    console.log(values.tags);

    router.push("/home");
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      const newTag = (e.target as HTMLInputElement).value.trim(); // Get the trimmed tag value
      if (newTag) {
        if(tags.length >= 3){
          form.setValue("tag", "");
        }
        else{
          setTags([...tags, newTag]); // Add the new tag to the tags array
          setTag(""); // Clear the tag input field
        }
      }
    }
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value); // Update tagValue state as user types
  };

  const [tags, setTags] = useState<string[]>([]); // Specify the type of tags as an array of strings
  const [tag, setTag] = useState("");

  return (
    <Form {...form}>
      <form
        className="mt-10 flex flex-col justify-start gap-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Content
              </FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Textarea rows={15} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tag"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Tags
              </FormLabel>

              <div className="flex flex-row gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-light-1 bg-dark-4 p-2 rounded-lg"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Input
                  type="text"
                  className="account-form_input no-focus p-3"
                  {...field}
                  value={tag}
                  onKeyDown={handleTagKeyDown}
                  onChange={handleTagChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-primary-500">
          Post
        </Button>
      </form>
    </Form>
  );
}

export default PostThread;
