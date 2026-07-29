import notifee, {
  AndroidImportance,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';

export async function createNotificationChannel() {
  await notifee.createChannel({
    id: 'schedule',
    name: 'Schedule Notifications',
    importance: AndroidImportance.HIGH,
  });
}

export async function scheduleNotification(
  title: string,
  body: string,
  date: Date,
) {
  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: date.getTime(),
     alarmManager: {
      allowWhileIdle: true,
    },
  };

  await notifee.createTriggerNotification(
    {
      title,
      body,
      android: {
        channelId: 'schedule',
      },
    },
    trigger,
  );
}
