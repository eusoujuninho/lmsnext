import React from "react";

import { Button } from "@/components/ui/button";

export const ConfirmModal = ({ isOpen, onClose, onConfirm, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center p-4">
      <div className="bg-white p-4 rounded shadow-lg">
        <div className="mb-4">{children}</div>
        <div className="flex justify-end space-x-2">
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onConfirm}>Yes</Button>
        </div>
      </div>
    </div>
  );
};
