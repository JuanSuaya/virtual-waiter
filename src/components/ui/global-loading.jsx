// src/components/ui/global-loading.jsx
import { useAppStore } from "@/store/useAppStore";
import { Loader2 } from "lucide-react";

export function GlobalLoading() {
  const isLoading = useAppStore((state) => state.isLoading);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="animate-spin text-white h-8 w-8" />
        <p className="text-white text-sm">Cargando...</p>
      </div>
    </div>
  );
}
