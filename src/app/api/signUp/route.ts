import dbconnect from "@/lib/dbconnect";
import Usermodel from "@/models/User";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";
export async function POST(request: NextRequest) {
  try {
    await dbconnect();
    const { username, email, password } = await request.json();
    const existingUsername = await Usermodel.findOne({
      username,
    });
    const existingEmail = await Usermodel.findOne({
      email,
    });
    const hashedPassword = await bcrypt.hash(password, 10);

    //Checking if the username has already been taken
    if (existingUsername || existingEmail) {
      Response.json(
        {
          success: false,
          message: "User credentials has already been registered",
        },
        { status: 400 }
      );
    }

    //registering new user
    const newUser = new Usermodel({
      username,
      email,
      password: hashedPassword,
    });
    console.log("newUser:", newUser);

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
    console.error("Error registering user", error);
    return Response.json(
      {
        success: false,
        message: "Error registering User",
      },
      {
        status: 500,
      }
    );
  }
}
