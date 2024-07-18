"use client";
import { StoreModelType } from "@/models/Storemodel";
import React, { useState } from "react";
import Heading from "./ui/heading";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { Separator } from "./ui/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { dashboardSettingSchema } from "@/schemas/dashboardSettingSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "./ui/input";
interface SettingFormpage {
  initialData: StoreModelType;
}
const SettingsForm: React.FC<SettingFormpage> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof dashboardSettingSchema>>({
    resolver: zodResolver(dashboardSettingSchema),
    defaultValues: {
      name: initialData.name,
    },
  });
  const onSubmit = async (data: z.infer<typeof dashboardSettingSchema>) => {
    console.log("Hello world");
  };
  return (
    <>
      <div className="flex items-center py-5 w-full px-10  justify-between gap-5">
        <Heading title="Settings" description="Manage Store preferences" />
        <Button
          variant={"destructive"}
          className=" relative"
          size={"icon"}
          disabled={loading}
          onClick={() => {
            setOpen(true);
          }}
        >
          <Trash2 />
        </Button>
      </div>
      <Separator />
      <div className=" w-[40%] flex flex-col justify-center items-start px-10 py-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-900">Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Store Name"
                      className="border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={loading} className=" mt-3" type={"submit"}>
              Save Changes
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default SettingsForm;
