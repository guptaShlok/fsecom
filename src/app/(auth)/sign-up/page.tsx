"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useDebounceCallback } from "usehooks-ts";
import axios, { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { signUpValidation } from "@/schemas/signUpSchema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ApiResponse } from "@/types/apiResponse";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";

const signUp = () => {
  const [Username, setUsername] = useState("");
  const [userNameMessage, setUserNameMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  //implementing debouncer
  const debouncedSetUsername = useDebounceCallback((value) => {
    setUsername(value);
  }, 500);
  //implementing toast
  const { toast } = useToast();
  //implementing router
  const router = useRouter();
  //zod implementation
  const form = useForm<z.infer<typeof signUpValidation>>({
    resolver: zodResolver(signUpValidation),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    setUserNameMessage("");
    setUsername("");
    setIsSubmitting(false);
  }, []);

  useEffect(() => {
    const checkUniqueUsername = async () => {
      if (!Username) {
        debouncedSetUsername("");
      }
      try {
        const response = await axios.get(
          `/api/uniqueUsername?username=${Username}`
        );
        setUserNameMessage(response.data.message);
      } catch (error: any) {
        console.error("Error verifying the username:", error);
      }
    };
    checkUniqueUsername();
  }, [Username]);

  const onSubmit = async (data: z.infer<typeof signUpValidation>) => {
    setIsSubmitting(true);
    try {
      console.log("Submitting data:", data);
      const response = await axios.post("/api/signUp", data);
      console.log("Response from signup endpoint:", response);

      toast({
        title: "Success",
        description: response.data.message,
      });

      router.replace(`verify-code/${data.username}`);
    } catch (error: any) {
      console.error("Error signing up user:", error);
      const axiosError = error as AxiosError<ApiResponse>;
      let errormessage = axiosError.response?.data.message;

      toast({
        title: "Signup Failed",
        description: errormessage ?? "Unknown error",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="py-12 w-[60vw] m-auto h-[100vh] flex justify-center items-center">
        <div className="flex flex-col h-[40%] gap-5 items-center justify-center pb-12 border-b-2 border-gray-900 w-full bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl w-full font-semibold leading-7 text-center text-gray-900">
            Welcome to mstrymsg
          </h2>
          <p className="mt-1 text-xl leading-6 text-gray-600">SignUp</p>
        </div>

        <Form {...form}>
          <form
            className="w-full px-5 pt-10"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-900">Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Gourvi Gupta"
                      className="border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                      {...field}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        field.onChange(e); // Update form state
                        debouncedSetUsername(e.target.value); // Update username state
                      }}
                    />
                  </FormControl>
                  <FormDescription
                    className={`font-normal pl-1 text-xs ${
                      Username === "Username is valid"
                        ? "text-green-500"
                        : "text-red-600"
                    }`}
                  >
                    {userNameMessage}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-900">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="gourvi@gmail.com"
                      className="border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-900">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="9755193039"
                      className="border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={isSubmitting}
              type="submit"
              className="w-full bg-black text-white font-bold py-2 px-4 rounded mt-6 hover:bg-gray-800"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin text-white" />
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center w-[50%] ">
          <p className="text-gray-600 flex items-start flex-col">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-black underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default signUp;
