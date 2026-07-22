# Calendar App

A Google Calendar-inspired React Native application for managing tasks and events in a clean, modern calendar experience. Built for smooth day-to-day planning, this app lets users browse monthly calendars, create schedules, and stay informed with reminders.

## Overview

This project focuses on a polished scheduling experience with:

- an interactive monthly calendar view
- infinite month navigation
- task and event creation
- all-day and time-based scheduling
- local storage for saved plans
- push-style reminders through notification support

## Key Features

- Monthly calendar grid with day selection
- Infinite scrolling between months
- Add tasks and events with title and description
- Support for all-day schedules and custom times
- Daily repeat option for tasks
- Holiday highlighting
- Local SQLite persistence
- Notification scheduling using Notifee
- Toast-based feedback for actions and errors

## Tech Stack

- React Native 0.86
- TypeScript
- React Navigation
- React Native Safe Area Context
- SQLite via react-native-nitro-sqlite
- Notifee for local notifications
- Day.js for date handling
- Jest for testing

## Project Structure

- src/components — reusable UI components such as calendar cells, headers, and modals
- src/screens — main screens including the calendar and add-schedule screen
- src/hooks — custom hooks for calendar state and schedule form logic
- src/context — shared calendar context
- src/database — database setup and schedule persistence
- src/services — notifications, holidays, and toast handling
- src/utils — calendar helpers and utilities

## Getting Started

### Prerequisites

Make sure the following are installed and configured:

- Node.js 22.11 or newer
- Android Studio or Xcode
- React Native development environment

### Install dependencies

```bash
npm install
```

### Start Metro

```bash
npm start
```

### Run on Android

```bash
npm run android
```

### Run on iOS

```bash
npm run ios
```

If you are running on iOS for the first time, install CocoaPods dependencies:

```bash
cd ios
pod install
cd ..
```

## Development Commands

```bash
npm test
npm run lint
```

## Notes

This app currently uses local database storage and notification support, making it a strong foundation for future enhancements such as cloud sync, multi-user collaboration, recurring calendar management, and richer reminder workflows.
