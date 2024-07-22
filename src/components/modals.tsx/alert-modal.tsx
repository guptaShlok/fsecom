"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-80 flex flex-col gap-7 justify-between">
        <div className="text-center mb-4 flex flex-col">
          <h2 className="text-xl font-semibold ">Alert</h2>
          <p className="w-full">Are you sure you want to proceed?</p>
        </div>
        <div className="flex justify-end space-x-2">
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={loading}
            variant={"destructive"}
          >
            {loading ? "Loading..." : "Confirm"}
          </Button>
        </div>
      </div>
    </div>
  );
};
