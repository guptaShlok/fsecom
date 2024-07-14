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
    console.log("User is present in the dashboard,", user);
    if (!user) {
      return redirect("/sign-in");
    }
  } catch (error) {
    console.log("Something went wrong:", error);
  }

  return <>{children}</>;
}
// export default function hello({ children }: { children: React.ReactNode }) {
//   return (
//     <>
//       hello form the layout
//       {children}
//     </>
//   );
// }
