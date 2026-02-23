# PoolWallet 💰

A full-stack mobile personal finance application built to track expenses, visualize spending habits, and manage daily transactions. 

> **Motivation:** This project was primarily built as a hands-on learning journey to dive deep into **React Native CLI** (moving beyond Expo) and **NestJS**. It served as a practical environment to master native mobile module integration, strict backend architecture, and full-stack JWT authentication.

## ✨ Features

* **🔐 Secure Authentication:** Full User Sign-up, Login, and Logout flows using securely hashed passwords (`bcrypt`) and persistent JSON Web Tokens (JWT) stored in mobile AsyncStorage.
* **📊 Data Visualization:** Interactive Pie Charts categorizing expenses using `react-native-chart-kit` and native SVG rendering.
* **📝 Full CRUD Capabilities:** Users can Create, Read, Update, and Delete their personal transactions in real-time.
* **🔍 Zero-Latency Search:** Instant client-side filtering to search through transaction history without hitting the database.
* **📱 Native Mobile UX:** Utilizes smooth nested navigation (Stack + Bottom Tabs), Pull-to-Refresh gestures, and SVG vector icons (`lucide-react-native`).

## 🛠 Tech Stack

### Frontend (Mobile App)
* **Framework:** React Native CLI (Not Expo)
* **Navigation:** React Navigation (Bottom Tabs & Native Stack)
* **Graphics:** `react-native-svg`, `react-native-chart-kit`, `lucide-react-native`
* **Storage:** `@react-native-async-storage/async-storage`

### Backend (API)
* **Framework:** NestJS (Node.js)
* **Database:** PostgreSQL (Hosted on Neon)
* **ORM:** Prisma
* **Security:** Passport.js, `@nestjs/jwt`, `bcrypt`

---

## 🚀 Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites
* Node.js and npm installed
* React Native CLI environment setup (Android Studio/SDKs configured)
* A PostgreSQL database (e.g., Neon.tech)

### 1. Backend Setup (NestJS)
Navigate into the backend directory:
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` root and add your database connection strings:
```env
DATABASE_URL="your_postgresql_url_here"
JWT_SECRET="your_super_secret_jwt_key"
```
Run the database migrations and start the server:
```bash
npx prisma db push
npm run start:dev
```

### 2. Frontend Setup (React Native CLI)
Open a new terminal and navigate to the mobile directory:
```bash
cd mobile/POOLWALLET
npm install
```
Start the Metro Bundler:
```bash
npm start
```
Open a third terminal and compile the Android app (make sure your emulator is running or a physical device is plugged in):
```bash
npm run android
```
*(Note: If you are running on a physical device, you may need to map the backend port using: `adb reverse tcp:3000 tcp:3000`)*

---

## 🧠 What I Learned
Throughout the development of this application, I tackled several complex full-stack engineering challenges:
1. **Relational Database Design:** Connecting `User` and `Transaction` models using Prisma foreign keys to ensure data segregation.
2. **Native Module Linking:** Successfully adding and compiling native Android C++/Java code for high-performance SVG graphics.
3. **Advanced Mobile Layouts:** Managing screen real estate by migrating static UI components into `FlatList` headers to prevent scrolling conflicts.
4. **Full-Stack Authentication:** Orchestrating a secure, token-based authentication flow (JWT & bcrypt) between a NestJS backend and a React Native client, including persistent sessions via AsyncStorage.

## 🤝 License
Distributed under the MIT License.
