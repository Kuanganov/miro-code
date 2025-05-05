import { createGStore } from "create-gstore";
import { useCallback, useState } from "react";

interface ConfirmDialogOptions {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

interface ConfirmDialogState extends ConfirmDialogOptions {
  isOpen: boolean;
  resolve: (value: boolean) => void;
}

export const useConfirmDialog = createGStore(() => {
  const [state, setState] = useState<ConfirmDialogState | null>(null);

  const openConfirmDialog = useCallback((options: ConfirmDialogOptions) => {
    return new Promise<boolean>((resolve) => {
      setState({
        ...options,
        isOpen: true,
        resolve,
      });
    });
  }, []);

  const handleClose = () => {
    if (state) {
      state.resolve(false);
      setState(null);
    }
  };

  const handleConfirm = () => {
    if (state) {
      state.resolve(true);
      setState(null);
    }
  };

  return {
    openConfirmDialog,
    confirmDialogState: state,
    handleClose,
    handleConfirm,
  };
});
