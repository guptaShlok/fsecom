"use client";
import { Modal } from "./modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useStoreModal } from "@/hooks/use-store-model";
import { storeformSchema } from "@/schemas/storeFormSchema";
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
  const storeModal = useStoreModal();

  const form = useForm<z.infer<typeof storeformSchema>>({
    resolver: zodResolver(storeformSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof storeformSchema>) {
    console.log(values);
    //todo create store
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
                      <Input placeholder="Ecommerce" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the name for the store.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className=" pt-6 space-x-2 flex items-center justify-end">
                <Button
                  variant={"outline"}
                  onClick={() => {
                    storeModal.onClose;
                  }}
                >
                  Cancel
                </Button>
                <Button
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
