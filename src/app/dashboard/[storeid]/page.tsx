import dbconnect from "@/lib/dbconnect";
import StoreModel from "@/models/Storemodel";
import React from "react";

interface DashboardProps {
  params: { storeId: string };
}
const DashboardPage: React.FC<DashboardProps> = async ({ params }) => {
  await dbconnect();
  const { storeId } = params;
  const store = await StoreModel.findById(storeId);

  return <div></div>;
};

export default DashboardPage;
