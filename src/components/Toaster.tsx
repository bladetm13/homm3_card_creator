"use client";

import { useEffect, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { onToast, ToastMessage } from "@/lib/toast";

const AUTOHIDE_MS = 6000;

export default function Toaster() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(
    () => onToast((toast) => setToasts((current) => [...current, toast])),
    []
  );

  const dismiss = (id: number) =>
    setToasts((current) => current.filter((toast) => toast.id !== id));

  return (
    <ToastContainer className="d-print-none p-3" position="bottom-end">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          bg={toast.tone === "success" ? "success" : "danger"}
          onClose={() => dismiss(toast.id)}
          delay={AUTOHIDE_MS}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">
              {toast.tone === "success" ? "Done" : "Could not open file"}
            </strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toast.text}</Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
}
