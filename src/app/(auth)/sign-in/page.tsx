"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
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
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { signInSchema } from "@/schemas/signInSchema";
import { signIn } from "next-auth/react";
import Link from "next/link";

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  //implementing toast
  const { toast } = useToast();
  //implementing router
  const router = useRouter();
  //zod implementation
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        identifier: data.identifier,
        password: data.password,
      });
      if (result?.error) {
        toast({
          title: "Sign In Failed",
          description: result.error,
          variant: "destructive",
        });
      } else if (result?.status == 200) {
        console.log("result:", result);
        toast({
          title: "Sign In Successfull",
          description: "Welcome aboard",
        });
        router.replace("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="py-12 w-[50vw] m-auto h-[100vh] flex items-center">
        <div className="flex flex-col gap-5 items-center justify-center pb-12 border-b-2 border-gray-900 w-full bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold leading-7 text-gray-900">
            Welcome to mstrymsg
          </h2>
          <p className="mt-1 text-xl leading-6 text-gray-600">SignIn</p>
        </div>

        <Form {...form}>
          <form
            className="w-full px-5 pt-10"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-900">
                    Email/Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="gourvi gupta/gourvi@gmail.com"
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
        <div className="mt-6 text-center w-[60%] ">
          <p className="text-gray-600 flex items-start flex-col">
            New to mstrymsg?{" "}
            <Link href="/sign-up" className="text-black underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;

//TODO in every file organize the imports in a certain manner like all the import of custom components at the last and all the general imports at the top
