import React from "react";
import Link from "next/link";
import MainNav from "./MainNav";
import StoreSwitcher from "./StoreSwitcher";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import StoreModel from "@/models/Storemodel";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import dbconnect from "@/lib/dbconnect";
const Navbar = async () => {
  await dbconnect();
  const session = await getServerSession(authOptions);
  const user = session?.user;

  // If user is not present, redirect to sign-in page
  if (!user) {
    redirect("/sign-in");
    return null; // Ensure it doesn't proceed after redirect
  }
  const stores = await StoreModel.find({ userId: user?._id }).lean();
  const plainStores = stores.map((store) => JSON.parse(JSON.stringify(store)));

  return (
    <>
      <nav className="bg-gray-800 p-4 text-black">
        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex space-x-4 items-center">
            {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
            <div className="  px-3 py-2 rounded-md text-sm font-medium">
              <StoreSwitcher items={plainStores} />
            </div>

            <MainNav className="px-3 py-2 " />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
