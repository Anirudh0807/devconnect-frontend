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
import OpenAI from "openai";
import { CohereClient } from "cohere-ai";
interface Props {
  userId: string;
}

function PostThread({ userId }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const cohere = new CohereClient({
    token: "14JdkYHLTQuh9o5XiWrgoc8unvij3PzKlojVl1lS", // This is your trial API key
  });
  const openai = new OpenAI({
    apiKey: "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",
    dangerouslyAllowBrowser: true,
  });

  const { organization } = useOrganization();

  const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    await createThread({
      text: values.thread,
      author: userId,
      communityId: organization ? organization.id : null,
      path: pathname,
    });

    router.push("/home");
  };

  const handleAI = async () => {
    const response = await cohere.generate({
      model: "command",
      prompt:
        "Classify the following content into developer related or not. Please answer with yes or no and do not give any reasoning. \n\n Content: React 19 has released",
      maxTokens: 300,
      temperature: 0.9,
      k: 0,
      stopSequences: [],
      returnLikelihoods: "NONE",
    });
    console.log(`Prediction: ${response.generations[0].text}`);
  };

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

        <Button type="submit" className="bg-primary-500">
          Post Thread
        </Button>
      </form>
      <Button className="bg-primary-500" onClick={handleAI}>
        AI
      </Button>
    </Form>
  );
}

export default PostThread;
