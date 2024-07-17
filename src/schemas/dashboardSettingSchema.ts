import { z } from "zod";

export const dashboardSettingSchema = z.object({
  name: z.string().min(2, {
    message: "Store name must be minimum 2 words",
  }),
});
