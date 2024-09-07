import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

function Modal({ children, open, className = '',onClose }) {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();  // Close the dialog when 'open' is false
    }
  }, [open]);

  // Ensure the portal target container exists
  const modalRoot = document.getElementById('modal');
  if (!modalRoot) {
    console.error("Modal root container with id 'modal' not found.");
    return null;
  }

  return createPortal(
    <dialog className={`modal ${className}`} ref={dialog} onClose={onClose}>
      {children}
    </dialog>,
    modalRoot  // Correct placement of the container here
  );
}

export default Modal;
