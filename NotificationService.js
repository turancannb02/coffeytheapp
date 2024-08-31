import notifee, { AndroidImportance } from '@notifee/react-native';
import { AppRegistry } from 'react-native';

class NotificationService {
  constructor() {
    this.notificationInterval = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
    this.notificationContent = {
      title: 'Default Title',
      body: 'Default Body Text',
    };
  }

  setNotificationContent({ title, body }) {
    this.notificationContent.title = title || this.notificationContent.title;
    this.notificationContent.body = body || this.notificationContent.body;
  }

  async createChannel() {
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });
  }

  async displayNotification() {
    await notifee.displayNotification({
      title: this.notificationContent.title,
      body: this.notificationContent.body,
      android: {
        channelId: 'default',
      },
    });
  }

  async start() {
    await this.createChannel();
    this.scheduleNotifications();
    this.scheduleDailyNotification(); // Schedule the daily notification
  }

  scheduleNotifications() {
    setInterval(() => {
      this.setNotificationContent({
        title: this.generateRandomTitle(),
        body: this.generateRandomBody(),
      });
      this.displayNotification();
    }, this.notificationInterval);
  }

  scheduleDailyNotification() {
    const now = new Date();
    const notificationTime = new Date();
    notificationTime.setHours(9, 1, 0, 0); // Set time to 09:01:00

    if (now > notificationTime) {
      // If the current time is after 09:01, schedule for the next day
      notificationTime.setDate(notificationTime.getDate() + 1);
    }

    const timeUntilNextNotification = notificationTime - now;

    setTimeout(() => {
      this.setNotificationContent({
        title: 'Falın Güncellendi!',
        body: 'Fal haklarınız güncellendi! Hadi fal bakmaya başla hemen!',
      });
      this.displayNotification();

      // After the first notification, schedule it to repeat every 24 hours
      setInterval(() => {
        this.setNotificationContent({
          title: 'Falın Güncellendi!',
          body: 'Fal haklarınız güncellendi! Hadi fal bakmaya başla hemen!',
        });
        this.displayNotification();
      }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds
    }, timeUntilNextNotification);
  }

  generateRandomTitle() {
    const titles = [
      'New Fortune Awaits!',
      'Your Coffee is Ready!',
      'Don’t Miss Out on Your Fortune!',
      'Time for a Coffee Break!',
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  }

  generateRandomBody() {
    const bodies = [
      'Check out your new coffee reading!',
      'Your fortune is ready to be revealed!',
      'A surprise is waiting in your coffee cup!',
      'Get your daily dose of fortune now!',
    ];
    return bodies[Math.floor(Math.random() * bodies.length)];
  }
}

const notificationService = new NotificationService();
AppRegistry.registerHeadlessTask('NotificationService', () => notificationService.start.bind(notificationService));

export default notificationService;
