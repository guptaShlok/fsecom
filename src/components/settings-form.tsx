"use client";
import { StoreModelType } from "@/models/Storemodel";
import React from "react";
import Heading from "./ui/heading";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { Separator } from "@radix-ui/react-dropdown-menu";
interface SettingFormpage {
  initialData: StoreModelType;
}
const SettingsForm: React.FC<SettingFormpage> = ({ initialData }) => {
  return (
    <div className="flex items-center py-5 px-10 justify-between gap-5">
      <Heading title="Settings" description="Manage Store preferences" />
      <Button variant={"destructive"} size={"icon"} onClick={() => {}}>
        <Trash2 />
      </Button>
      <Separator />
    </div>
  );
};

export default SettingsForm;
