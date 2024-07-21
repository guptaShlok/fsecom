import dbconnect from "@/lib/dbconnect";
import StoreModel from "@/models/Storemodel";
import Usermodel from "@/models/User";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server"; // Import NextResponse

export async function POST(request: NextRequest) {
  try {
    await dbconnect();
    const { name, _id } = await request.json();
    const existingUsername = await Usermodel.findOne({ name });

    // Checking if the name has already been taken
    if (existingUsername) {
      return NextResponse.json(
        {
          success: false,
          message: "User credentials have already been registered",
        },
        { status: 400 }
      );
    } else {
      const userBhai = await StoreModel.findById(_id);
      console.log("UserBhai:", userBhai);
      const response = await StoreModel.updateOne(
        { _id: new ObjectId(`${_id}`) }, // Ensure _id is an ObjectId
        { $set: { name: `${name}` } }
      );
      console.log("Response:", response);
      if (response.modifiedCount == 1) {
        return Response.json(
          {
            success: true,
            message: "User name updated successfully",
          },
          { status: 200 }
        );
      } else {
        return Response.json(
          {
            success: false,
            message: "Username can't be changed",
          },
          { status: 401 }
        );
      }
    }
  } catch (error) {
    console.error("Error changing the name of the user", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error changing name!",
      },
      { status: 500 }
    );
  }
}
//TODO modify the return response such that if conditions can be applied
