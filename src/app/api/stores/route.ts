import dbconnect from "@/lib/dbconnect";
import { NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextRequest } from "next/server";
import StoreModel from "@/models/Storemodel";
import Usermodel from "@/models/User";

export async function POST(request: NextRequest, response: NextApiResponse) {
  await dbconnect();
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    console.log("USer in store route:", user);
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

    const body = await request.json();

    const { name, description } = body;

    //checking if the store name is present or not
    if (!name) {
      return Response.json(
        {
          success: false,
          message: "Name is required",
        },
        {
          status: 400,
        }
      );
    }
    //checking if the store is already registered or not
    const uniqueUser = await StoreModel.find({
      name: name,
    });
    console.log("Unique user:", uniqueUser);
    if (uniqueUser.length > 0) {
      return Response.json(
        {
          success: false,
          message: "Store has already been registered",
        },
        {
          status: 400,
        }
      );
    }

    const store = new StoreModel({
      name,
      userId: user._id,
      description,
    });
    await store.save();
    return Response.json(
      {
        success: true,
        message: "Product created successfully!",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error in stores route", error);
    return Response.json(
      {
        success: false,
        message: "Internal server error!",
      },
      {
        status: 500,
      }
    );
  }
}
