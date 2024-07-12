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
    <div>
      {/* Your page content here */}
      {/* <Modal
        title="Sample Modal"
        description="This is a sample modal."
        isOpen={isOpen}
        onClose={useStoreModal((state) => state.onClose)}
      >
        <p>This is the modal content.</p>
      </Modal> */}
    </div>
  );
};

export default Page;
