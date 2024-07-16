"use client";
import { Button } from "@/components/ui/button";
import { useStoreModal } from "@/hooks/use-store-model";
import { PlusCircleIcon } from "lucide-react";
import React, { useEffect } from "react";

const Page: React.FC = () => {
  const isOpen = useStoreModal((state) => state.isOpen);
  const onOpen = useStoreModal((state) => state.onOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [onOpen, isOpen]);

  return (
    <>
      <Button variant={"ghost"}>
        Create a Store <PlusCircleIcon />
      </Button>
    </>
  );
};

export default Page;
