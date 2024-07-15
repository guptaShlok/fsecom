"use client";
import { Modal } from "@/components/modals.tsx/modal";
import { useStoreModal } from "@/hooks/use-store-model";
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
      <div>Hehe</div>
    </>
  );
};

export default Page;
