"use client";

import { StoreModal } from "@/components/modals.tsx/store-modal";
//this component has been made to add to a server component to avoid hydration errors

import React, { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <StoreModal />
    </>
  );
};
