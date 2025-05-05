import { rqClient } from "@/shared/api/instance";
import { useConfirmDialog } from "@/shared/ui/confirm";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export function useDeleteBoard() {
  const queryClient = useQueryClient();
  const openConfirmDialog = useConfirmDialog((s) => s.openConfirmDialog);
  const deleteBoardMutation = rqClient.useMutation(
    "delete",
    "/boards/{boardId}",
    {
      onSettled: async () => {
        await queryClient.invalidateQueries(
          rqClient.queryOptions("get", "/boards"),
        );
      },
    },
  );

  const deleteBoard = useCallback(
    async (boardId: string) => {
      const isConfirmed = await openConfirmDialog({
        title: "Удалить доску",
        description: "Вы уверены, что хотите удалить доску?",
        confirmVariant: "destructive",
      });

      if (!isConfirmed) return;

      deleteBoardMutation.mutate({
        params: { path: { boardId } },
      });
    },
    [openConfirmDialog, deleteBoardMutation],
  );

  return {
    deleteBoard,
    getIsPending: (boardId: string) =>
      deleteBoardMutation.isPending &&
      deleteBoardMutation.variables?.params?.path?.boardId === boardId,
  };
}
