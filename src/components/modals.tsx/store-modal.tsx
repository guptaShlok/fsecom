"use client";
import { useState } from "react";
import axios from "axios";
import { useToast } from "../ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useStoreModal } from "@/hooks/use-store-model";
import { storeformSchema } from "@/schemas/storeFormSchema";
import { Modal } from "./modal";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const StoreModal = () => {
  const { toast } = useToast();
  const storeModal = useStoreModal();
  const [loading, setloading] = useState(false);
  const form = useForm<z.infer<typeof storeformSchema>>({
    resolver: zodResolver(storeformSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof storeformSchema>) {
    console.log(values);
    try {
      setloading(true);
      const response = axios.post("/api/stores", values);
      console.log(response);
      toast({
        title: "Success",
        description: "Store created successfully!",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  }
  return (
    <>
      <Modal
        title="Create Store"
        description="Add a new store to manage products and categories"
        isOpen={storeModal.isOpen}
        onClose={storeModal.onClose}
      >
        <div className="space-y-4 pb-4 py-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Ecommerce"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the name for the store.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (optional)</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className=" pt-6 space-x-2 flex items-center justify-end">
                <Button
                  disabled={loading}
                  variant={"outline"}
                  onClick={() => {
                    storeModal.onClose;
                  }}
                >
                  Cancel
                </Button>
                <Button
                  disabled={loading}
                  onClick={() => {
                    storeModal.onOpen;
                  }}
                  type="submit"
                >
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </Modal>
    </>
  );
};
