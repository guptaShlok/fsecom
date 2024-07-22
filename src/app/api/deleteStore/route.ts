import dbconnect from "@/lib/dbconnect";
import StoreModel from "@/models/Storemodel";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server"; // Import NextResponse
import { authOptions } from "../../api/auth/[...nextauth]/options";

export async function POST(request: NextRequest) {
  await dbconnect();
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    //Check if session is present or not
    if (!user || !session) {
      console.log("User not found");
      return Response.json(
        {
          success: false,
          message: "User not found!",
        },
        {
          status: 401,
        }
      );
    }
    const { _id } = await request.json();
    const response = await StoreModel.findByIdAndDelete(_id);
    console.log("Response after deleting:", response);
    if (response) {
      return NextResponse.json(
        {
          success: true,
          message: "Store deleted successfully!",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Something went wrong!",
        },
        { status: 401 }
      );
    }
  } catch (error) {
    console.log("Error in the settings delete route,", error);
    return NextResponse.json(
      {
        success: false,
        message: "Sever error!",
      },
      { status: 500 }
    );
  }
}
