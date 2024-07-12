import { createResponse } from "@/helpers/response";
import dbconnect from "@/lib/dbconnect";
import { NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextRequest } from "next/server";
import StoreModel from "@/models/Storemodel";

export async function POST(request: NextRequest, response: NextApiResponse) {
  await dbconnect();
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    //Check if session is present or not
    if (!user || !session) {
      console.log("User not found");
      return createResponse(response, {
        success: false,
        message: "User not found!",
        status: 401,
      });
    }

    const body = await request.json();
    console.log(body);

    const { name, description } = body;

    //checking if the store name is present or not
    if (!name) {
      return createResponse(response, {
        success: false,
        message: "Name is required",
        status: 400,
      });
    }

    //checking if the store is already registered or not
    const uniqueUser = await StoreModel.find({
      name: name,
    });
    if (uniqueUser) {
      return createResponse(response, {
        success: false,
        message: "Store has already been registered",
        status: 400,
      });
    }

    const store = new StoreModel({
      name,
      userId: user._id,
      description,
    });
    console.log("New store:", store);
    await store.save();
    return createResponse(response, {
      success: true,
      message: "New store created successfully",
      status: 200,
    });
  } catch (error) {
    console.log("Error in stores route", error);
    return createResponse(response, {
      success: false,
      message: "Server error!",
      status: 500,
    });
  }
}
