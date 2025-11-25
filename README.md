📘 React Native App Development – Experiments (EXP 1–14)
Mini Project & Weekly Experiments — Goa College of Engineering (GEC)

Course: App Development
Semester: 3
Student: Ved Marathe
Department: Information Technology

📂 List of Experiments (EXP 1–14)

Below is a clean summary of all experiments completed as part of the App Development curriculum.

## EXP 1 — Introduction to React Native & App Setup

✔ Installed Node.js, npm, Gradle, Android Studio
✔ Installed React Native CLI
✔ Created the first boilerplate app
✔ Ran the app on Android Emulator and physical device

Concepts Covered: Environment setup, project structure, components folder, running Metro bundler.

EXP 2 — Basic UI Components

✔ Implemented Text, View, Image, TouchableOpacity
✔ Practiced styling using StyleSheet
✔ Created simple layouts

Concepts Covered: JSX, props, styling, Flexbox layout.

EXP 3 — AppCounter

✔ Built a counter app using useState()
✔ Buttons to increment, decrement, and reset
✔ Explored state updates and re-rendering

Concepts Covered: Hooks (useState), event handling, basic state management.

EXP 4 — Form Handling

✔ Built form with TextInput fields: Name, Email, Phone
✔ Validations added
✔ Displayed submitted data

Concepts Covered: Controlled components, form validation, keyboard handling.

EXP 5 — To-Do Application

✔ Added tasks
✔ Marked tasks as completed
✔ Deleted tasks
✔ Tabs navigation added

Tech:

Hooks

FlatList

Tab Navigation

Concepts: CRUD with local state.

EXP 6 — Drawer Navigation

✔ Implemented DrawerNavigator
✔ Added multiple drawer screens
✔ Custom drawer UI

Concepts: Navigation fundamentals.

EXP 7 — Bottom Tabs + Drawer + Stack Navigation

✔ Combined all navigation types
✔ Created a multi-screen mini app
✔ Nested navigators cleanly

Concepts: Nested navigators, navigation props, screen hierarchy.

EXP 8 — Tabs + Drawer App

✔ Created a UI with both drawer & tab screens
✔ Used icons & custom headers

Concepts: Screen organization, layout management.

EXP 9 — Expo Image Picker / Permissions

✔ Accessed camera/gallery
✔ Picked images and displayed them
✔ Used expo-permissions

Concepts: Asynchronous functions, permissions, media APIs.

EXP 10 — API Fetching

✔ Fetched data from a public REST API
✔ Rendered JSON response in FlatList
✔ Added loading & error states

Concepts:

fetch()

Promises & async/await

Error handling

EXP 11 — MoonPhase API App

✔ Integrated Moon Phase API
✔ Displayed moon phases, dates & details
✔ Clean UI with icons

Concepts:

Consuming external APIs

State handling

API-driven UI updates

EXP 12 — Firebase Authentication

✔ Implemented Signup/Login
✔ Used Firebase Authentication (Email & Password)
✔ Validations + error handling
✔ Redirected user after login

Concepts: Firebase Auth, context usage, protected screens.

EXP 13 — Testing in React Native

✔ Snapshot testing
✔ UI Interaction Testing
✔ Jest configuration

Concepts:

Jest

React Native Testing Library

Snapshot files

EXP 14 — Mini Project (CampusConnect)

A full-fledged mobile application integrating:

✔ Authentication

Firebase Auth + Context API

✔ Firestore (for posts, users, communities)

Create, read, update, delete operations

✔ Navigation

Stack Navigator

Drawer Navigator

Bottom Tabs

Nested navigation

✔ UI Library

Vector icons & custom UI screens

✔ Features

Login/Signup

Profiles

Communities

Events

Inbox

AI Assistant screen

Posting UI

Notifications

✔ Requirements Met

✔ 5+ screens
✔ Authentication
✔ Firestore
✔ UI Library
✔ Working code
✔ Clean repo with .gitignore
✔ Readable project structure

🛠️ Tech Stack Used

React Native CLI

TypeScript

Firebase (Auth + Firestore)

React Navigation

Expo Vector Icons

Jest (Testing)

📑 How to Run Any Experiment
npm install
npx react-native run-android


For mini-project (CampusConnectMobile):

cd EXP14_MiniProject/CampusConnectMobile
npm install
npx react-native run-android

🧹 Git & Repository Standards

A clean .gitignore is included, which removes:

node_modules
android/build
ios/build
gradle-wrapper
keystore files
.env
