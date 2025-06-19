import { useState } from "react";

type ToastType = {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  [key: string]: any;
};

let toastId = 0;

export function useToast() {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  function toast({ title, description, action }: Omit<ToastType, "id">) {
    setToasts((prev) => [
      ...prev,
      { id: String(++toastId), title, description, action },
    ]);
  }

  function remove(id: string) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  return { toasts, toast, remove };
}