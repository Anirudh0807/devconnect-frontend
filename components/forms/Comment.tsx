"use client";

import { z } from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { usePathname } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { CohereClient } from "cohere-ai";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { CommentValidation } from "@/lib/validations/thread";
import { addCommentToThread } from "@/lib/actions/thread.actions";
import CustomToast, { showErrorToast } from "../ui/customToast"; 

  
interface Props {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
}

function Comment({ threadId, currentUserImg, currentUserId }: Props) {
  const pathname = usePathname();
  const cohere = new CohereClient({
    token: "14JdkYHLTQuh9o5XiWrgoc8unvij3PzKlojVl1lS", // This is your trial API key
  });

  const form = useForm<z.infer<typeof CommentValidation>>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: "",
    },
  });

    // yes
    const handleAI = async (customPrompt: string) => {
      const prompt = `The following text content is the comment under a social media post I need you to carefully judge if this is a comment that is relavant to the conversation or not, the entire idea of the website is developer oriented, so if you find anything that feels offensive or extremely unrelated then flag it. if it is then return yes if it isnt then return a no. \n\n Content: ${customPrompt}\n\n`;
  
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

  const onInvalid = (errors: any) => console.error(errors);
  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {

    const isDeveloperRelated = await handleAI(values.thread);
    console.log(isDeveloperRelated);

    if (isDeveloperRelated) {
      
    try {
      console.log("helooo");

      const res = await addCommentToThread(
        threadId,
        values.thread,
        JSON.parse(currentUserId),
        pathname
      );
      console.log("hey");

      form.reset();
    } catch (error: any) {
      console.log(error);
    }
  } else {
    
    showErrorToast(
      "Content is not developer related, Please make sure you only upload content relavent to development!",
    );
  }
    }

  return (
    <Form {...form}>
      <form
        className="comment-form"
        onSubmit={form.handleSubmit(onSubmit, onInvalid)}
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex w-full items-center gap-3">
              <FormLabel>
                <Image
                  src={currentUserImg}
                  alt="current_user"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </FormLabel>
              <FormControl className="border-none bg-transparent">
                <Input
                  type="text"
                  {...field}
                  placeholder="Comment..."
                  className="no-focus text-light-1 outline-none"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="comment-form_btn">
          Reply
        </Button>

        <CustomToast/>

      </form>
    </Form>
  );
}

export default Comment;
