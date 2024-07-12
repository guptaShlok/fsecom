"use client";
import { useStoreModal } from "@/hooks/use-store-model";
import { Modal } from "./modal";

export const StoreModal = () => {
  const storeModal = useStoreModal();
  return (
    <>
      <Modal
        title="create store"
        description="Add a new store to manage products and categories"
        isOpen={storeModal.isOpen}
        onClose={storeModal.onClose}
      >
        Future create store form
      </Modal>
    </>
  );
};
