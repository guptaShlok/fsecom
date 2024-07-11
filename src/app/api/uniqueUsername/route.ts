import dbconnect from "@/lib/dbconnect";
import Usermodel from "@/models/User";
import { userNameValidation } from "@/schemas/signUpSchema";
import { NextResponse } from "next/server";
import { z } from "zod";

const userNameQuerySchema = z.object({
  username: userNameValidation,
});

export async function GET(request: Request) {
  await dbconnect();

  try {
    const { searchParams } = new URL(request.url);
    const queryParam = {
      username: searchParams.get("username"),
    };

    //validation with zod
    const result = userNameQuerySchema.safeParse(queryParam);
    if (!result.success) {
      const userNameErrors = result.error.format().username?._errors || [];
      return NextResponse.json(
        {
          success: false,
          message:
            userNameErrors?.length > 0
              ? userNameErrors.join(", ")
              : "Invalid query Parameters",
        },
        { status: 400 }
      );
    }

    const { username } = result.data;
    const existingVerifiedUser = await Usermodel.findOne({
      username,
      isVerified: true,
    });

    if (existingVerifiedUser) {
      return NextResponse.json(
        { success: false, message: "Username already exist" },
        { status: 405 }
      );
    }
    return NextResponse.json(
      { success: true, message: "Username is valid" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error checking username", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error checking username",
      },
      { status: 500 }
    );
  }
}
