# CoffeyTheApp (Fortune Teller App)

**Coffey** is a mobile application built using React Native and Firebase services. The app is designed to provide an engaging user experience by integrating coffee-related features, user authentication, and interactive content such as fortune telling. Additionally, the app leverages Google AdMob for in-app advertisements.

## Features

- **User Authentication:** Users can register and log in using Firebase Authentication.
- **Coffee Cup Uploading:** Users can upload pictures of coffee cups, which are processed in-app for fortune telling.
- **Fortune Telling:** An engaging feature where users can view their fortunes based on the coffee cups they upload. The fortunes are generated using OpenAI's **GPT-4 API**.
- **Ad Integration (Ongoing):** The app will display banner and interstitial ads using Google AdMob. The integration is still in progress and will be completed in future updates.
- **Responsive UI:** Built with React Native, the app supports both Android and iOS platforms.
- **Push Notifications:** The app uses Firebase Cloud Messaging to deliver push notifications.
- **Zodiac Utilization:** Provides additional features related to zodiac signs.

## Screens

- **Login Screen:** Allows users to sign in or register.
- **Main Screen:** Home screen with navigation to other key app features.
- **Coffee Cup Upload Screen:** Users can upload a picture of their coffee cup to receive a fortune.
- **Fortune Loading Screen:** Displays while the user's fortune is being generated.
- **Fortune Teller View Screen:** Shows the generated fortune after analysis.
- **Settings Screen:** Users can adjust their app settings, including notifications.
- **Splash Screen:** A branded loading screen displayed when the app is launched.

## Tech Stack

- **Frontend:** React Native with TypeScript
- **Backend:** Firebase (Authentication, Firestore, Cloud Functions)
- **Notifications:** Firebase Cloud Messaging (FCM)
- **In-App Ads (Ongoing):** Google AdMob (still in progress)
- **Fortune Generation:** OpenAI GPT-4 API
- **State Management:** React Context API
- **Build Tools:** Yarn, Babel, Metro bundler

## Installation

### Prerequisites

- Node.js (>= 12.x)
- Yarn (or npm)
- Firebase CLI
- Android Studio (for Android builds)
- Xcode (for iOS builds)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/turancannb02/coffeytheapp.git
   cd coffeytheapp
   
2. Install dependencies:

   ```bash
   yarn install
   
3. Set up Firebase:

- Create a Firebase project and configure authentication and Firestore.
- Replace the firebaseConfig.js file with your Firebase credentials.
4. Run the application:

- For Android:

   ```bash
   yarn android
- For iOS:

   ```bash
   yarn ios
## Running Tests
This project uses Jest for unit testing. To run tests, execute the following command


      yarn test
   
### Firebase Setup
To use Firebase services (authentication, cloud storage, etc.), you must:
- Install Firebase CLI:

   ```bash
   npm install -g firebase-tools
- Login and initialize Firebase:

   ```bash
   firebase login
   firebase init
- Deploy functions and other Firebase-related services as needed.

## AdMob Integration (Ongoing)
To enable ads, configure your AdMob account and add the required ad unit IDs in the appropriate files:

- Banner ads: `BannerAdComponent.tsx`
- Interstitial ads: `useInterstitialAd.tsx`

Note: The integration with Google AdMob is still in progress and will be completed in future updates.

## Contribution Guidelines
   - Fork the repository and create your feature branch. 
   - Make your changes and test thoroughly. 
   - Open a pull request with a description of your changes.

## License
This project is licensed under the MIT License.

## Security
Please report any security concerns or vulnerabilities to the repository maintainers via email or GitHub issues.
