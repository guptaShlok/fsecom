import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import StoreModel from "@/models/Storemodel";
import dbconnect from "@/lib/dbconnect";
import { authOptions } from "../api/auth/[...nextauth]/options";

export default async function RootLayout({
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

  const store = await StoreModel.findOne({ userId: user._id });

  if (store) {
    console.log("redirecting to the dashboard");
    redirect(`/dashboard/${store._id}`);
  }

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
