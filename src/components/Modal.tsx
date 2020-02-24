import React from "react";

// TODO: сделать, чтобы модалка выглядела не так отвратительно
export function Modal({
  isOpen,
  children,
  onClose
}: {
  isOpen: boolean;
  children: any;
  onClose: () => void;
}) {
  return isOpen ? (
    <div
      className="modal"
      onClick={({ target }) => {
        // @ts-ignore
        if (target && target.className === "modal") {
          onClose();
        }
      }}
    >
      <div className="modal__content">
        <div className="modal__close" onClick={onClose}>
          x
        </div>
        <div className="modal__text">{children}</div>
      </div>
    </div>
  ) : null;
}
