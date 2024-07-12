import { NextApiResponse } from "next";

interface ResponseProps {
  success: boolean;
  message: string;
  status: number;
}

export const createResponse = (
  res: NextApiResponse,
  { success, message, status }: ResponseProps
) => {
  return res.status(status).json({
    success,
    message,
  });
};
