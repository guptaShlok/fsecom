import { authOptions } from "@/app/api/auth/[...nextauth]/options";
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
  try {
    await dbconnect();
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) {
      return redirect("/sign-in");
    }

    const store = await StoreModel.findOne({ userId: user._id });

    if (!store) {
      return redirect("/");
    }
  } catch (error) {
    console.log("Something went wrong:", error);
  }

  return (
    <>
      This is going to be a navbar
      {children}
    </>
  );
}
