"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import EmojiPicker from "emoji-picker-react";
import { createCardApi } from "../lib/fetchData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  title: z.string(),
  emoji: z.string(),
  description: z.string(),
});

export default function AddCardForm() {
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      emoji: "",
    },
  });

  const mutation = useMutation({
    mutationFn: createCardApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
      form.reset();
    },
    onError: (error) => {
      console.error("Error creating card:", error);
      alert("Failed to create card. Check console for error. Please try again.");
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }

  const isLoading = mutation.isPending;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        <h2 className="text-3xl">Create decision card</h2>
        <div className="flex items-center gap-4 w-full">
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your decision"
                      type="text"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="relative flex items-center gap-2 w-1/2">
            <div>
              <Button
                className="block mt-8"
                variant="outline"
                type="button"
                onClick={() => setIsPickerVisible(!isPickerVisible)}
                disabled={isLoading}
              >
                Choose Emoji
              </Button>
              {isPickerVisible && (
                <div className="absolute z-10 bg-white shadow-lg border p-2">
                  <EmojiPicker
                    onEmojiClick={(res) => {
                      form.setValue("emoji", res.emoji);
                      setIsPickerVisible(false);
                    }}
                  />
                </div>
              )}
            </div>
            <div>
              <FormField
                control={form.control}
                name="emoji"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <p className="text-6xl">{form.watch("emoji") || ""}</p>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your decision"
                  className="resize-none"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormDescription>
                Describe what impact above decision has
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? <> <Loader2 className="animate-spin" /> Please wait</> : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
