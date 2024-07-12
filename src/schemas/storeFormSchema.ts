"use client";
import * as z from "zod";

export const storeformSchema = z.object({
  name: z.string().min(2, {
    message: "Store name must be minimum 2 words",
  }),
  description: z.string().optional(),
});
