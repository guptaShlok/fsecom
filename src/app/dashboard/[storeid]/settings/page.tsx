import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import SettingsForm from "@/components/settings-form";
import StoreModel from "@/models/Storemodel";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const SettingsPage = async ({ params }: { params: { storeId: string } }) => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  // If user is not present, redirect to sign-in page
  if (!user) {
    redirect("/sign-in");
    return null; // Ensure it doesn't proceed after redirect
  }
  const storeId = params.storeId;
  const storeName = await StoreModel.findById(storeId);
  // If no store is found, redirect to home page
  if (!storeName) {
    redirect("/");
    return null; // Ensure it doesn't proceed after redirect
  }
  return (
    <div>
      <SettingsForm initialData={storeName} />
    </div>
  );
};

export default SettingsPage;
