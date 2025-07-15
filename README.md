# FitPreps Native

FitPreps Native is a mobile application built with React Native and Expo, providing a platform for fitness enthusiasts to manage their nutrition, supplements, and gym wear.

## Features

- Product browsing (meals, supplements, gym wear)
- Product filtering and search
- Shopping cart functionality
- User authentication
- Progress tracking
- Workout video content
- Subscription management

## Tech Stack

- React Native
- Expo
- TypeScript
- Tamagui (UI Framework)
- Redux Toolkit (State Management)
- React Query (Data Fetching)
- React Native Gesture Handler
- React Native Safe Area Context

## Project Structure

```
src/
├── app/                 # Main application routes and screens
├── components/          # Reusable UI components
├── constants/           # Application constants
├── helper.ts           # Utility functions
├── hooks/              # Custom React hooks
├── store/              # Redux store and slices
├── toast-config/       # Toast notification configuration
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## Key Components

### Authentication

- Login/Registration
- Password Recovery

### Product Management

- Product Lists
- Product Details
- Product Filters
- Product Search

### Shopping Features

- Shopping Cart
- Product Categories
- Date Selection
- Subscription Management

### Tracking & Progress

- Progress Charts
- Weekly Tracking
- Workout Videos

### UI Components

- Custom Loading Spinner
- Filter Buttons
- Search Components
- Date Pickers
- Toast Notifications

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

3. Run on a specific platform:

```bash
npm run android
# or
npm run ios
```

## Environment Setup

Ensure you have the following installed:

- Node.js
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - see LICENSE file for details

## Contact

For support or questions, please open an issue in the repository.
