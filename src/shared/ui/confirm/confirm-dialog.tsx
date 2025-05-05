import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/kit/dialog";
import { Button } from "@/shared/ui/kit/button";
import { useConfirmDialog } from "./use-confirm-dialog";

export function ConfirmDialog() {
  const { confirmDialogState, handleClose, handleConfirm } = useConfirmDialog();

  if (!confirmDialogState) {
    return null;
  }

  const {
    isOpen,
    title,
    description,
    confirmText,
    cancelText,
    confirmVariant,
  } = confirmDialogState;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            {cancelText ?? "Отменить"}
          </Button>
          <Button variant={confirmVariant} onClick={handleConfirm}>
            {confirmText ?? "Подтвердить"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
