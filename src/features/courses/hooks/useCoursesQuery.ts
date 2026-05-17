import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/query-keys";
import { courseRepository } from "@/shared/services/repositories/course.repository";

export const useCoursesQuery = () =>
  useQuery({
    queryKey: queryKeys.courses.list,
    queryFn: () => courseRepository.list(),
    staleTime: 1000 * 60,
    retry: 2,
  });
