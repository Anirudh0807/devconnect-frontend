"use client";

import { useOrganization } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { createThread } from "@/lib/actions/thread.actions";
import { ThreadValidation } from "@/lib/validations/thread";
import { CohereClient } from "cohere-ai";
import { useState } from "react";
import { Input } from "../ui/input";
import { toast } from "react-toastify";
import { ButtonLoading } from "../ui/loadingButton";
import CustomToast, { showErrorToast, showSuccessToast } from "../ui/customToast";
import Image from "next/image";

interface Props {
  userId: string;
}

function PostThread({ userId }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  const cohere = new CohereClient({
    token: "14JdkYHLTQuh9o5XiWrgoc8unvij3PzKlojVl1lS", // This is your trial API key
  });
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
    setLoading(true);
    values.tags = tags;

    const isDeveloperRelated = await handleAI(values.thread);
    console.log(isDeveloperRelated);

    if (isDeveloperRelated && tags.length > 0) {
      await createThread({
        text: values.thread,
        author: userId,
        communityId: organization ? organization.id : null,
        tags: values.tags,
        likes: [],
        path: pathname,
      });
      console.log(values.tags);
      setLoading(false);
      router.push("/home");
      showSuccessToast("Post created successfully")
    } else if (values.tags.length === 0) {
      setLoading(false);
      showErrorToast("Please add at least one tag");
    } else {
      setLoading(false);
      showErrorToast(
        "Content is not developer related, Please make sure you only upload content relavent to development!"
      );
    }
  };

  // yes
  const handleAI = async (customPrompt: string) => {
    const prompt = `Carefully classify the following social media post content into developer related or not. Please answer with yes or no and do not give any reasoning. \n\n Content: ${customPrompt}\n\n`;

    const response = await cohere.generate({
      model: "command",
      prompt,
      maxTokens: 300,
      temperature: 0.9,
      k: 0,
      stopSequences: [],
      returnLikelihoods: "NONE",
    });

    const generatedText = response.generations[0].text.toLowerCase();

    // Check if the generated text contains "yes" or "no"
    const isDeveloperRelated = generatedText.includes("yes");

    // console.log(`Prompt: ${"customPrompt"}`);
    // console.log(`Prediction: ${generatedText}`);
    // console.log(`Is Developer Related: ${isDeveloperRelated}`);

    return isDeveloperRelated;
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault(); // Prevent form submission
      const newTag = (e.target as HTMLInputElement).value.trim(); // Get the trimmed tag value
      if (newTag) {
        if (tags.length >= 3) {
          showErrorToast("You can only add 3 tags");
          form.setValue("tag", "");
        } else {
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
                Tags ( Press Enter or Tab to add a tag )
              </FormLabel>

              <div className="flex flex-row gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-light-1 bg-dark-4 p-2 rounded-lg flex flex-row gap-2 items-center"
                  >
                    {tag}

                    <Image
                      src="/assets/delete.svg"
                      alt="delte"
                      width={18}
                      height={18}
                      className="cursor-pointer object-contain"
                      onClick={async () => {
                        const newTags = tags.filter((_, i) => i !== index);
                        setTags(newTags);
                      }}
                    />
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
        {/* <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        /> */}
        <CustomToast />

        {loading ? (
          <ButtonLoading />
        ) : (
          <Button type="submit" className="bg-primary-500">
            Post
          </Button>
        )}
      </form>
      {/* <Button className="bg-primary-500" onClick={handleAI}>
        AI
      </Button> */}
    </Form>
  );
}

export default PostThread;
