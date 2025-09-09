# 📰 SecureNewsHub

A full-stack news aggregation platform built with **GraphQL**, **React**, **Node.js**, and **MongoDB**. It automatically fetches, parses, and delivers news from RSS feeds with robust user authentication and personalized filtering.

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js)](https://nodejs.org/)
[![GraphQL](https://img.shields.io/badge/GraphQL-Apollo-E10098?logo=graphql)](https://graphql.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-47A248?logo=mongodb)](https://www.mongodb.com/)

## ✨ Features

- **🔐 Secure JWT Authentication:** User registration/login with encrypted password storage.
- **📡 Automated RSS Ingestion:** Background service fetches and parses news from multiple RSS feeds.
- **🔍 Personalized News Feed:** Filter articles by category, tags, or custom search terms.
- **⚡ GraphQL API:** Single endpoint for efficient and flexible data fetching.
- **🎨 Responsive React Dashboard:** Multi-page UI with routing for a seamless user experience.

## 🛠️ Tech Stack

- **Frontend:** React, React Router, Context API (or Redux), Axios/Apollo Client
- **Backend:** Node.js, Express, Apollo Server (GraphQL), Mongoose (ODM)
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens), bcrypt
- **Other Tools:** Nodemailer (for email confirmation), Cron jobs (for RSS fetching)

## 📦 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/engrtonydev/SecureNewsHub.git
    cd SecureNewsHub
    ```

2.  **Install dependencies for both server and client:**
    ```bash
    # Install backend dependencies
    cd server
    npm install

    # Install frontend dependencies
    cd ../client
    npm install
    ```

3.  **Environment Setup:**
    - Create a `.env` file in the `server` directory based on the `.env.example` (if provided).
    - Add your MongoDB connection string, JWT secret, and email service credentials.

4.  **Run the application:**
    ```bash
    # Start the backend server (from /server)
    npm run dev

    # Start the frontend development server (from /client)
    npm start
    ```
    The app will be available at `http://localhost:3000` and the GraphQL playground at `http://localhost:5000/graphql` (port may vary).

## 🚀 Usage

1.  **Register a new account** with your email and password.
2.  **Confirm your email address** via the link sent to your inbox.
3.  **Log in** using your credentials.
4.  **Customize your feed** by selecting preferred categories and tags.
5.  **Browse and search** through your personalized news dashboard.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.