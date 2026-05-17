import { useQuery } from "@tanstack/react-query";

import { profileRepository } from "@/shared/services/repositories/profile.repository";
import { queryKeys } from "@/shared/constants/query-keys";

export const useProfileQuery = () =>
  useQuery({
    queryKey: queryKeys.profile.me,
    queryFn: () => profileRepository.getProfile(),
    retry: 2,
  });
