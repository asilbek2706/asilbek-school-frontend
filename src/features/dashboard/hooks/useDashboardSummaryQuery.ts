import { useQuery } from "@tanstack/react-query";

import { dashboardRepository } from "@/shared/services/repositories/dashboard.repository";
import { queryKeys } from "@/shared/constants/query-keys";

export const useDashboardSummaryQuery = () =>
  useQuery({
    queryKey: queryKeys.dashboard.summary,
    queryFn: () => dashboardRepository.summary(),
    retry: 2,
    refetchInterval: 1000 * 60 * 3,
  });
