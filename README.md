# 🍽️ Jirone — Smart Canteen Management System

> A modern, web-based canteen ordering and kitchen management system built for **Assam Down Town University (ADTU)** to eliminate long queues and streamline campus dining.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-brightgreen?style=flat-square&logo=githubpages&logoColor=white)](https://raj-dey.github.io/Jirone---Smart-Canteen-Management-System/)
[![Firebase](https://img.shields.io/badge/Firebase-11.0.1-FFCA28?style=flat-square&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Cloud Firestore](https://img.shields.io/badge/Cloud%20Firestore-Realtime%20DB-FFA000?style=flat-square&logo=firebase&logoColor=white)](https://firebase.google.com/docs/firestore)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/)

👉 **Live Demo:** [https://raj-dey.github.io/Jirone---Smart-Canteen-Management-System/](raj-dey.github.io/Jirone---Smart-Canteen-Management-System/)

---

## 📸 Screenshots

<p align="center">
  <b>Student Ordering Interface</b><br>
  <img width="100%" alt="Student Interface" src="https://github.com/user-attachments/assets/3d6e5cef-2e60-495a-af21-dcc40a470b1a" /><br><br>
  <b>Admin & Kitchen Live Dashboard</b><br>
  <img width="100%" alt="Admin Dashboard" src="https://github.com/user-attachments/assets/fffff2a8-f421-40a6-9347-1c296b2097b7" />
</p>

---

## ✨ Key Features

### 🎓 For Students
- **Campus Block Menus:** Filter food items specifically available in **Blocks A, B, J, and K**.
- **QR Code Table Ordering:** Scan table QR codes using the in-app camera scanner or select table numbers manually.
- **Real-Time Order Tracking:** Live order updates (`Pending` ➔ `Ready`) powered by Firestore real-time listeners.
- **Search & Dietary Filters:** Quick search with one-click **Veg** and **Non-Veg** filters.
- **Automated Digital Invoices:** Instant order receipts sent directly to the student's email via EmailJS.

### 👨‍🍳 For Kitchen & Admin Staff
- **Live Order Feed:** Incoming orders appear instantly without manual page refreshing.
- **One-Click Dispatch:** Mark orders as "Ready" to immediately notify students in their portal.
- **WhatsApp Notification:** Quick-action WhatsApp button (`wa.me`) to alert students when their food is ready.
- **Menu & Stock Management:** Add new food items with auto image compression and toggle items between **In-Stock** and **Sold Out**.

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, Vanilla CSS3 (responsive design), Vanilla JavaScript (ES6+ Modules)
- **Backend & Database:** Firebase 11.0.1 (Authentication & Cloud Firestore Realtime DB)
- **Libraries & APIs:**
  - `Html5-Qrcode` — In-browser QR code scanner
  - `EmailJS` — Automated invoice email dispatch
  - `jsPDF` — Digital invoice formatting
  - `FontAwesome 6` — Icons

---

## 📁 Project Structure

```plaintext
├── assets/                    # Media assets and background images
├── docs/                      # Project reports and presentation slides
├── app.js                     # Core logic, Firebase listeners & state management
├── firebase-config.example.js # Template Firebase credentials
├── firebase-config.js         # Local Firebase config (gitignored)
├── index.html                 # Single page application structure
├── style.css                  # Custom styling & responsive layouts
└── README.md
```

---

## 🚀 Quick Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/raj-dey/Jirone---Smart-Canteen-Management-System.git
   cd Jirone---Smart-Canteen-Management-System
   ```

2. **Configure Firebase:**
   Copy the example config and add your Firebase credentials:
   ```bash
   cp firebase-config.example.js firebase-config.js
   ```

3. **Run locally:**
   Serve using any local web server:
   ```bash
   python3 -m http.server 8000
   # or
   npx serve .
   ```
   Open `http://localhost:8000` in your browser.

---

## 👨‍💻 Author

**Raj Dey**  
B.Tech Computer Science & Engineering  
Assam Down Town University (ADTU)  
- GitHub: [@raj-dey](https://github.com/raj-dey)
- Repository: [Jirone - Smart Canteen Management System](https://github.com/raj-dey/Jirone---Smart-Canteen-Management-System)
