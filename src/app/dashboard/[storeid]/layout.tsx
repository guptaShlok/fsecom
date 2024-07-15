import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Navbar from "@/components/Navbar";
import dbconnect from "@/lib/dbconnect";
import StoreModel from "@/models/Storemodel";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  await dbconnect();

  // Log the entire params object
  console.log("Params object:", params);

  // Extract storeId from params
  const { storeId } = params;

  // Log the extracted storeId
  console.log("Extracted storeId:", storeId);

  // If storeId is undefined, throw an error
  if (!storeId) {
    throw new Error("Store ID is not defined in params");
  }

  // Fetch session to get user information
  const session = await getServerSession(authOptions);
  const user = session?.user;

  console.log("User is present in the dashboard,", user);

  // If user is not present, redirect to sign-in page
  if (!user) {
    redirect("/sign-in");
    return null; // Ensure it doesn't proceed after redirect
  }

  // Query the StoreModel to check if the store exists
  const store = await StoreModel.findById(storeId);

  console.log("Store in dashboard layout", store);

  // If no store is found, redirect to home page
  if (!store) {
    console.log("Redirecting to home page");
    redirect("/");
    return null; // Ensure it doesn't proceed after redirect
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
