import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { notificationRepository } from "@/shared/services/repositories/notification.repository";
import { queryKeys } from "@/shared/constants/query-keys";

export const useNotificationsQuery = () =>
  useQuery({
    queryKey: queryKeys.notifications.list,
    queryFn: () => notificationRepository.list(),
  });

type NotificationListQueryData = {
  data?: Array<{ id: string; read: boolean }>;
};

export const useMarkNotificationReadMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationId: string) => notificationId,
    onMutate: async (notificationId) => {
      const key = queryKeys.notifications.list;
      await queryClient.cancelQueries({ queryKey: key });
      const previous = queryClient.getQueryData<NotificationListQueryData>(key);

      queryClient.setQueryData<NotificationListQueryData>(key, (current) => {
        if (!current?.data) {
          return current;
        }

        return {
          ...current,
          data: current.data.map((item: { id: string; read: boolean }) =>
            item.id === notificationId ? { ...item, read: true } : item
          ),
        };
      });

      return { previous };
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKeys.notifications.list, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.list });
    },
  });
};
