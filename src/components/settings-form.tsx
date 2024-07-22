"use client";
import { StoreModelType } from "@/models/Storemodel";
import React, { useState } from "react";
import Heading from "./ui/heading";
import { Button } from "./ui/button";
import { LoaderPinwheel, Trash2 } from "lucide-react";
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
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "./modals.tsx/alert-modal";
import { useToast } from "./ui/use-toast";
interface SettingFormpage {
  initialData: StoreModelType;
}
const SettingsForm: React.FC<SettingFormpage> = ({ initialData }) => {
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { storeId } = params;
  const router = useRouter();
  const form = useForm<z.infer<typeof dashboardSettingSchema>>({
    resolver: zodResolver(dashboardSettingSchema),
    defaultValues: {
      name: initialData.name,
    },
  });
  const onSubmit = async (data: z.infer<typeof dashboardSettingSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/setting", {
        name: data.name,
        _id: storeId,
      });
      if (response.status == 200) {
        toast({
          title: "success",
          description: "Name changed successfully",
        });
        window.location.reload();
      } else {
        toast({
          title: "Failed",
          description: "User already found with saem credentials",
          variant: "destructive",
        });
      }
    } catch (error) {
      setLoading(true);
      console.log("ERor,", error);
    } finally {
      setLoading(false);
    }
  };
  const onDelete = async () => {
    try {
      console.log("Hello inside of the onDelete");
      setLoading(true);
      const response = await axios.post("/api/deleteStore", {
        _id: storeId,
      });
      if (response.status == 200) {
        toast({
          title: "success",
          description: "Store deleted successfully",
        });
        router.push("/");
      } else {
        toast({
          title: "Failed",
          description: "Something went wrong",
          variant: "destructive",
        });
      }
    } catch (error) {
      setLoading(true);
      console.log("ERor,", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
        onConfirm={() => {
          onDelete();
        }}
        loading={loading}
      />
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
              {loading ? (
                <LoaderPinwheel className=" animate-spin" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default SettingsForm;
