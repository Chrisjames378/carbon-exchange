// Web Notification Service for Atmosphere Eco Platform

export interface ReminderConfig {
  dailyAction: boolean;
  dailyBonus: boolean;
  climateGoal: boolean;
  reminderHour: number; // 0 - 23 (e.g., 9 for 9 AM)
}

export const DEFAULT_REMINDER_CONFIG: ReminderConfig = {
  dailyAction: true,
  dailyBonus: true,
  climateGoal: true,
  reminderHour: 9 // Default 9:00 AM
};

export const isNotificationSupported = (): boolean => {
  return typeof window !== 'undefined' && 'Notification' in window;
};

export const getNotificationPermission = (): NotificationPermission => {
  if (!isNotificationSupported()) return 'denied';
  return Notification.permission;
};

export const requestNotificationPermission = async (): Promise<NotificationPermission> => {
  if (!isNotificationSupported()) return 'denied';
  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return 'denied';
  }
};

export const sendWebNotification = (
  title: string,
  options?: NotificationOptions & { onClickUrl?: string }
): boolean => {
  if (!isNotificationSupported() || Notification.permission !== 'granted') {
    return false;
  }

  try {
    const notification = new Notification(title, {
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      vibrate: [200, 100, 200],
      tag: 'atmosphere-eco-reminder',
      renotify: true,
      ...options
    });

    notification.onclick = (event) => {
      event.preventDefault();
      window.focus();
      notification.close();
    };

    return true;
  } catch (e) {
    console.error('Failed to dispatch Web Notification:', e);
    return false;
  }
};

export const sendTestEcoNotification = () => {
  return sendWebNotification('🌱 Atmosphere Daily Eco Reminder', {
    body: 'Great job staying eco-conscious! Remember to log your green actions today & claim your +25 Eco Bonus.',
    tag: 'atmosphere-test-reminder'
  });
};

export const sendGoalCheckinNotification = (goalTitle: string, progressText: string) => {
  return sendWebNotification('🎯 Climate Goal Target Check-in', {
    body: `Progress update on "${goalTitle}": ${progressText}. Keep pushing towards your target!`,
    tag: 'atmosphere-goal-checkin'
  });
};

export const sendDailyBonusNotification = () => {
  return sendWebNotification('✨ Daily Eco Bonus Ready!', {
    body: 'Your daily streak bonus (+25 Eco Credits) is waiting for you. Log in now to claim!',
    tag: 'atmosphere-bonus-ready'
  });
};
