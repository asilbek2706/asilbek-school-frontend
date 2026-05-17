import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

import { normalizeError, isRetryableError } from "@/shared/errors";

export const createAppQueryClient = () =>
  new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        normalizeError(error);
      },
    }),
    mutationCache: new MutationCache({
      onError: (error) => {
        normalizeError(error);
      },
    }),
    defaultOptions: {
      queries: {
        retry: (failureCount, error) =>
          isRetryableError(error) && failureCount < 2,
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: (failureCount, error) =>
          isRetryableError(error) && failureCount < 1,
      },
    },
  });
