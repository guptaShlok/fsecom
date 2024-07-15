import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import StoreModel from "@/models/Storemodel";
import dbconnect from "@/lib/dbconnect";
import { authOptions } from "../api/auth/[...nextauth]/options";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await dbconnect();
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect("/sign-in");
  }

  const store = (await StoreModel.findOne({ userId: user?._id })) || null;

  if (store) {
    redirect(`/dashboard/${store?._id}`);
  } else {
    redirect("/");
  }
  return <>{children}</>;
}
