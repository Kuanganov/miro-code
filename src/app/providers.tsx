import { queryClient } from "@/shared/api/query-client";
import { ConfirmDialog } from "@/shared/ui/confirm";

import { QueryClientProvider } from "@tanstack/react-query";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ConfirmDialog />
    </QueryClientProvider>
  );
}
