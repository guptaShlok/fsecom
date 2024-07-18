import dbconnect from "@/lib/dbconnect";
import Usermodel from "@/models/User";
import { NextRequest } from "next/server";
export async function POST(request: NextRequest) {
  try {
    await dbconnect();
    const { username } = await request.json();
    const existingUsername = await Usermodel.findOne({
      username,
    });

    //Checking if the username has already been taken
    if (existingUsername) {
      Response.json(
        {
          success: false,
          message: "User credentials has already been registered",
        },
        { status: 400 }
      );
    }

    //registering new user

    return Response.json(
      {
        success: true,
        message: "User registered successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error changing the name of the user", error);
    return Response.json(
      {
        success: false,
        message: "Error changing name!",
      },
      {
        status: 500,
      }
    );
  }
}
