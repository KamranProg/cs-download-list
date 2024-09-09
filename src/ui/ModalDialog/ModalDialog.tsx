import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import { AiOutlineCloseCircle } from "react-icons/ai";
import styles from "@/ui/ModalDialog/ModalDialog.module.css";

interface ModalDialogProps {
  open: boolean;
  onClose: () => void;
  header: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

function ModalDialog({
  open,
  onClose,
  header,
  children,
  footer,
  className,
}: ModalDialogProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === overlayRef.current) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [onClose, open]);

  return (
    <div
      ref={overlayRef}
      className={clsx(styles.modalOverlay, { [styles.open]: open }, className)}
      onClick={handleBackdropClick}
    >
      <div className={styles.modalDialog}>
        <AiOutlineCloseCircle
          size={24}
          className={styles.modalCloseIcon}
          onClick={onClose}
          aria-label="Close modal"
        />
        <header>
          {header}
        </header>
        <main>{children}</main>
        {footer && <footer>{footer}</footer>}
      </div>
    </div>
  );
}

export default ModalDialog;
