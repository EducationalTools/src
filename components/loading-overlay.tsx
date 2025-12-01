import { useUiState } from "@/lib/state";
import { Spinner } from "./ui/spinner";
import { cn } from "@/lib/utils";

export default function LoadingOverlay() {
  const { loadingOverlayOpen, loadingOverlayMessage } = useUiState();

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/50 pointer-events-none opacity-0 transition-opacity duration-200 backdrop-blur-2xl gap-2",
        loadingOverlayOpen && "opacity-100 pointer-events-auto"
      )}
    >
      <Spinner />
      <p className="text-sm text-white">{loadingOverlayMessage}</p>
    </div>
  );
}
