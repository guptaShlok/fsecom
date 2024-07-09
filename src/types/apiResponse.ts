//THis is a basic template for the api response

import { Message } from "@/models/User";
export interface ApiResponse {
  success: boolean;
  message: string;
  isAcceptingMessage?: boolean;
  messages?: Array<Message>;
}
