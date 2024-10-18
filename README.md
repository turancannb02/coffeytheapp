# CoffeyTheApp (Fortune Teller App)

## Overview
CoffeyTheApp is an innovative React Native application that offers an engaging coffee fortune telling experience, blending traditional practices with cutting-edge technology. Designed for cross-platform use (iOS and Android), it integrates several advanced features and APIs to provide a unique user experience.

## Key Features

### 1. User Authentication and Profile Management
- Secure user registration and login using Firebase Authentication.
- Comprehensive user profile management, including personal details and preferences.
- Multi-language support (Turkish and English) using i18next for internationalization.

### 2. Coffee Fortune Telling Process
- Users can upload multiple images of their coffee cup and saucer.
- Image upload functionality includes both camera and gallery options.
- Implements a coin-based system for fortune telling credits.

### 3. AI-Powered Fortune Generation
- Integrates OpenAI's GPT-4 API for generating personalized fortunes.
- Asynchronous fortune processing with an engaging loading screen.

### 4. Interactive User Interface
- Modern, gradient-based design using React Native Linear Gradient.
- Features modals for various functionalities, enhancing user experience.
- Custom icons and images for a unique app identity.

### 5. Data Management and Storage
- Utilizes Firebase Firestore for efficient data storage and retrieval.
- Real-time data updates for user information and fortunes.

### 6. Advanced React Native Features
- Seamless screen transitions with React Navigation.
- Custom hooks for state management (e.g., useUser).
- Smooth animations using React Native's Animated API.

### 7. Localization and Internationalization
- Full support for multiple languages (currently Turkish and English).
- Dynamic in-app language switching.

### 8. Performance Optimization
- Efficient list rendering using FlatList for past fortunes.
- Optimized component rendering with React.memo and useCallback.

### 9. Error Handling and User Feedback
- Comprehensive error handling with user-friendly alert messages.
- Loading states and indicators for asynchronous operations.

### 10. Accessibility Features
- Accessibility labels and hints for improved usability.

### 11. Future-Ready Features (In Progress)
- Integration of Google AdMob for monetization (banner and interstitial ads).
- Daily horoscope and astrology chart features (marked as "Coming Soon").

## Technical Highlights

### React Native and TypeScript
- Developed using React Native for cross-platform compatibility.
- TypeScript implementation for enhanced code quality and developer experience.

### State Management
- Custom state management solution using React Context API and hooks.

### API Integration
- Seamless integration with Firebase services (Auth, Firestore, Storage).
- OpenAI GPT-4 API integration for AI-powered fortune generation.

### UI/UX Design
- Custom-styled components for a unique look and feel.
- Responsive design adapting to different screen sizes and orientations.

### Code Structure and Organization
- Modular code structure with separate components for different functionalities.
- Consistent naming conventions and code styling.

### Testing and Quality Assurance
- Error boundaries for graceful error handling.
- Unit and integration tests for critical components.

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
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Set up Firebase:
   - Create a Firebase project and configure authentication and Firestore.
   - Replace the firebaseConfig.js file with your Firebase credentials.

4. Run the application:
   - For Android:
     ```bash
     yarn android
     ```
   - For iOS:
     ```bash
     yarn ios
     ```

## Running Tests
This project uses Jest for unit testing. To run tests, execute:
```bash
yarn test
```

## Firebase Setup
To use Firebase services:
- Install Firebase CLI:
  ```bash
  npm install -g firebase-tools
  ```
- Login and initialize Firebase:
  ```bash
  firebase login
  firebase init
  ```
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
