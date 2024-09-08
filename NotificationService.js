import notifee, { AndroidImportance } from '@notifee/react-native';
import { AppRegistry } from 'react-native';
import firestore from '@react-native-firebase/firestore'; // Add Firestore import

class NotificationService {
  constructor() {
    this.notificationInterval = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
    this.notificationContent = {
      title: 'Varsayılan Başlık',
      body: 'Varsayılan Mesaj Metni',
    };
  }

  setNotificationContent({ title, body }) {
    this.notificationContent.title = title || this.notificationContent.title;
    this.notificationContent.body = body || this.notificationContent.body;
  }

  async createChannel() {
    await notifee.createChannel({
      id: 'default',
      name: 'Varsayılan Kanal',
      importance: AndroidImportance.HIGH,
    });
  }

  async logNotificationToFirestore() {
    const notificationData = {
      title: this.notificationContent.title,
      body: this.notificationContent.body,
      timestamp: firestore.FieldValue.serverTimestamp(), // Store timestamp
    };

    // Add notification to Firestore
    try {
      await firestore().collection('notifications').add(notificationData);
      console.log('Notification logged successfully');
    } catch (error) {
      console.error('Error logging notification:', error);
    }
  }

  async displayNotification() {
    await notifee.displayNotification({
      title: this.notificationContent.title,
      body: this.notificationContent.body,
      android: {
        channelId: 'default',
      },
    });

    // Log notification to Firestore
    this.logNotificationToFirestore();
  }

  async start() {
    await this.createChannel();
    this.scheduleNotifications();
    this.scheduleDailyNotification(); // Günlük bildirimi planla
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
        title: '🔮 Falın Güncellendi!',
        body: '☕ Fal haklarınız güncellendi! Hadi fal bakmaya başla hemen! 🚀',
      });
      this.displayNotification();

      // After the first notification, schedule it to repeat every 24 hours
      setInterval(() => {
        this.setNotificationContent({
          title: '🔮 Falın Güncellendi!',
          body: '☕ Fal haklarınız güncellendi! Hadi fal bakmaya başla hemen! 🚀',
        });
        this.displayNotification();
      }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds
    }, timeUntilNextNotification);
  }

  generateRandomTitle() {
    const titles = [
      '🌟 Yeni Bir Fal Seni Bekliyor!',
      '☕ Kahven Hazır!',
      '✨ Fırsatı Kaçırma! Falını Öğren!',
      '☕ Bir Kahve Molası Zamanı!',
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  }

  generateRandomBody() {
    const bodies = [
      '🔮 Yeni fal yorumunu incele!',
      '🌟 Falın hazır, hemen keşfet!',
      '☕ Kahve fincanında bir sürpriz seni bekliyor!',
      '✨ Günlük falını öğren ve güne başla!',
    ];
    return bodies[Math.floor(Math.random() * bodies.length)];
  }
}

const notificationService = new NotificationService();
AppRegistry.registerHeadlessTask('NotificationService', () => notificationService.start.bind(notificationService));

export default notificationService;
