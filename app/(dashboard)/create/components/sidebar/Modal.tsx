import React, { type FC } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }
  const handleModalClosing = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-10 mt-10 h-screen w-screen items-center justify-center bg-slate-500"
      onClick={handleModalClosing}
    >
      <div className="absolute inset-0 z-20 m-14 items-center justify-center bg-black">
        {children}
      </div>
    </div>
  );
};

export default Modal;
