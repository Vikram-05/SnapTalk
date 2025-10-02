# 🎥💬 SnapTalk – Random Video Chat App  

<!-- <p align="center">
  <img width="300" alt="SnapTalk UI" src="https://your-screenshot-link-1.png" />
  <img width="300" alt="Chat Feature" src="https://your-screenshot-link-2.png" />
</p> -->

---

## ✅ Requirements

1. Modern browser (Chrome, Firefox, Edge)
2. Allow **Camera** and **Microphone** access

---

## 📋 Overview

**SnapTalk** is a real-time, peer-to-peer video chat web application that connects you with random people across the world.  
Built with **React**, **WebRTC**, and **Socket.IO**, SnapTalk enables seamless one-on-one video communication and text chat — directly in your browser.

✨ It features a responsive, mobile-friendly UI and easy-to-use media controls for a smooth chatting experience.

---

## 🔧 Tech Stack

| Layer        | Technology           |
|--------------|----------------------|
| Frontend     | React, Vite, Tailwind CSS, React Router |
| Video/Audio  | WebRTC               |
| Real-time    | Socket.IO            |
| Backend      | Node.js, Express.js  |
| Emoji Support | Emoji Picker (React) |
| Icons        | React Icons          |
| Deployment   | Render (Frontend & Backend) |

---

## 🌟 Features

- 🔀 **Random Video Chat** – Connect with users instantly
- 🎥 **WebRTC Streaming** – Low-latency peer-to-peer video & audio
- 💬 **Live Chat** – Send messages with emoji support
- 😊 **Emoji Picker** – React emoji picker integration
- 🎛️ **Media Controls** – Toggle microphone and camera
- ⏭️ **Skip Button** – Instantly switch to a new user
- 🔲 **Fullscreen Mode** – Expand video for immersive view
- 📱 **Responsive UI** – Optimized for mobile and desktop

---

## 🚀 Getting Started

### 📦 Prerequisites

- [Node.js](https://nodejs.org/)
- npm

---

### 🛠️ Installation

Clone the repository:

```bash
git clone https://github.com/Vikram-05/SnapTalk.git
cd SnapTalk
```
🔧 Backend Setup
```bash
Copy code
cd backend
npm install
npm run dev
# Runs on http://localhost:3000
```
💻 Frontend Setup

```bash
Copy code
cd ../frontend
npm install
npm run dev
# Runs on http://localhost:5173
```
🌐 Deployment
🔙 Backend (Render)
Environment: Node.js

Build Command: npm install

Start Command: npm start

Example URL: https://your-backend.onrender.com

🔜 Frontend (Vercel / Netlify / Render)
Build Command: npm run build

Output Directory: dist (for Vite)

⚙️ Environment Variables
Frontend .env file:
```
VITE_BACKEND_URL=https://your-backend.onrender.com
```

env
Copy code
```
🔌 WebSocket Setup (Production)
Use wss:// for production:

js
Copy code
const socket = io("https://your-backend.onrender.com");
```
🎮 How to Use SnapTalk
Open the app in a browser

Allow camera and microphone permissions

Click Start Chat to connect

Use controls to:

🎥 Toggle camera

🎤 Toggle mic

😊 Open emoji picker

⏭️ Skip user

🔲 Enter fullscreen

Use chat to send messages or emojis

Click Disconnect to end session

🛠️ Troubleshooting
Issue	Solution
❌ Camera/Mic not working	Check browser permissions and ensure no other app is using them
⚠️ Connection failed	Ensure backend is HTTPS-enabled and running
⏳ No users available	Wait for more users to join or check backend logs for activity

🤝 Contributing
Contributions are welcome! 🙌

How to Contribute:
🐞 Report issues in the GitHub Issues tab

💡 Suggest features using [FEATURE] in the issue title

📤 Submit PRs with clean, well-documented code

Areas for Improvement:
🎨 UI/UX enhancements

⚡ Performance optimizations

🎯 Interest-based user matching

🧪 Automated testing setup

🚨 Error handling improvements

📁 Project Structure
```bash
Copy code
SnapTalk/
├── backend/
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── public/
│   │   ├── pattern.jpg
│   │   ├── pattern2.jpg
│   │   └── vite.svg
│   └── src/
│       ├── App.jsx
│       ├── App.css
│       ├── index.css
│       ├── main.jsx
│       ├── assets/
│       │   └── react.svg
│       ├── pages/
│       │   ├── LandingPage.jsx
│       │   ├── VideoPage.jsx
│       │   └── Full.jsx
│       └── service/
│           └── service.js
```






## 🙏 Acknowledgments
🌐 WebRTC – Real-time video streaming

⚡ Socket.IO – Real-time messaging

🎨 Tailwind CSS – Styling framework

⚛️ React – UI library

😄 Emoji Picker for React
