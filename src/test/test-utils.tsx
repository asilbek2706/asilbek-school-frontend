import type { ReactElement } from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { createAppQueryClient } from "@/shared/api";

export const renderWithProviders = (
  ui: ReactElement,
  options?: { route?: string }
) => {
  const queryClient = createAppQueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[options?.route ?? "/"]}>{ui}</MemoryRouter>
    </QueryClientProvider>
  );
};
