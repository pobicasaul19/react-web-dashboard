import { useNotifications as coreUseNotifications } from '@toolpad/core/useNotifications';

export function useNotifications() {
  const notifications = coreUseNotifications();
  return {
    show: (message: string, options: { severity: 'success' | 'error' | 'info' }) => {
      notifications.show(message, options);
    },
  };
}