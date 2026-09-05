<div align="center">

  # 🍽️ Jirone — Smart Canteen Management System
  
  **Next-Generation Cloud-Powered Dining & Kitchen Management Platform for Campus Ecosystems**

  [![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-brightgreen?style=for-the-badge&logo=githubpages&logoColor=white)](https://raj-dey.github.io/Jirone---Smart-Canteen-Management-System/)
  [![GitHub Repo](https://img.shields.io/badge/Repository-Jirone-blue?style=for-the-badge&logo=github&logoColor=white)](https://github.com/raj-dey/Jirone---Smart-Canteen-Management-System)
  [![Institution](https://img.shields.io/badge/Institution-Assam%20Down%20Town%20University-orange?style=for-the-badge&logo=googlescholar&logoColor=white)](https://adtu.in/)
  
  <br />

  [![Firebase](https://img.shields.io/badge/Firebase-11.0.1-FFCA28?style=flat-square&logo=firebase&logoColor=black)](https://firebase.google.com/)
  [![Firestore](https://img.shields.io/badge/Database-Cloud%20Firestore-FFA000?style=flat-square&logo=firebase&logoColor=white)](https://firebase.google.com/docs/firestore)
  [![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B%20Modules-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
  [![HTML5](https://img.shields.io/badge/HTML5-Semantic%20Markup-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
  [![CSS3](https://img.shields.io/badge/CSS3-Modern%20UI%20Design-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
  [![EmailJS](https://img.shields.io/badge/Email%20API-EmailJS-FF6C37?style=flat-square&logo=mailgun&logoColor=white)](https://www.emailjs.com/)
  [![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

  <br />

  [🚀 Explore Live Demo](https://raj-dey.github.io/Jirone---Smart-Canteen-Management-System/) • 
  [📖 Project Documentation](#-project-documentation--reports) • 
  [✨ Key Features](#-core-features) • 
  [🛠️ Tech Stack](#%EF%B8%8F-technical-stack--architecture) • 
  [🚀 Setup Guide](#-setup--installation)

</div>

---

## 📌 Executive Summary

**Jirone** is a purpose-built, cloud-native canteen management ecosystem engineered specifically for **Assam Down Town University (ADTU)**. Campus dining halls often experience high peak-hour congestion, long queue delays, order preparation mix-ups, and manual paper-token bottlenecks.

Jirone solves these operational challenges by creating an end-to-end digital pipeline connecting students, tables across multiple campus blocks, and the kitchen administration with **instantaneous real-time synchronization**.

Students enjoy hassle-free table-side QR code ordering, multi-block menu browsing, dietary filtering, and automated digital email invoicing. Simultaneously, canteen operators manage a real-time Kitchen Display System (KDS), adjust live item inventory, and notify diners directly via WhatsApp when orders are ready.

---

## 📸 Interface Preview

<div align="center">
  <h3>✨ Student Experience & Ordering Portal</h3>
  <img width="100%" alt="Jirone Student Portal Preview" src="https://github.com/user-attachments/assets/3d6e5cef-2e60-495a-af21-dcc40a470b1a" style="border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.15);" />
  <br /><br />
  <h3>⚡ Real-Time Kitchen Dashboard & Menu Inventory</h3>
  <img width="100%" alt="Jirone Kitchen Admin Dashboard Preview" src="https://github.com/user-attachments/assets/fffff2a8-f421-40a6-9347-1c296b2097b7" style="border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.15);" />
</div>

---

## 🚀 Core Features

### 🎓 For Students & Diners
* **🏢 Multi-Block Dynamic Ordering:** Filter active menus based on location within ADTU campus premises (specifically **Blocks A, B, J, and K**).
* **📷 Table-Side QR Scanner:** Built-in web camera QR scanner (`Html5-Qrcode`) for instant table identification, alongside a manual table picker (Tables 1–10+).
* **⚡ Real-Time Order Tracking:** Live order state updates (`Pending` ➔ `Ready`) powered by reactive Firebase Firestore event listeners.
* **🔍 Instant Search & Dietary Preferences:** Real-time keystroke searching across meal names and categories, with one-tap **Veg / Non-Veg** dietary filters.
* **🛒 Responsive Shopping Cart:** Dynamic cart updates with quantity tracking, price summation, and table validation checks before checkout.
* **📧 Automated Email Invoicing:** Integrates EmailJS to deliver itemized order receipts directly to the student's registered email inbox upon checkout.
* **💫 Micro-Animations & Feedback:** Checkmark transition animations, custom toast notifications, and modern mobile-first UI patterns.

### 👨‍🍳 For Administrators & Kitchen Staff
* **📊 Live Kitchen Order Feed (KDS):** Incoming orders stream in real-time without requiring manual page refreshes, showing table number, customer name, and order items.
* **✔️ One-Click Order Dispatch:** Mark orders as "Ready" in one tap; instantly reflects on the student's order history screen.
* **💬 One-Click WhatsApp Notification:** Direct `wa.me` shortcut with pre-configured greeting (`Hello {name}, your order is READY at Jirone Canteen!`) to alert students over WhatsApp.
* **📦 Dynamic Menu Management:** Add new dishes on-the-fly with custom titles, pricing, category (Snacks, Lunch, Drinks, Chinese), dietary tags, and multi-block availability checkboxes.
* **🔄 Kitchen Stock Control:** Toggle items between `In-Stock` and `Sold Out` instantly; sold-out items are automatically grayed out and disabled for students in real-time.
* **🖼️ Client-Side Image Compression:** Built-in HTML5 Canvas image resizing engine downscales uploaded food pictures to optimized dimensions before cloud persistence.

---

## 🛠️ Technical Stack & Architecture

### Technology Breakdown

| Layer | Technologies / Tools | Purpose & Implementation |
| :--- | :--- | :--- |
| **Frontend UI** | HTML5, Modern Vanilla CSS3, JavaScript (ES6+ Modules) | Lightweight, zero-framework, dependency-free interface with custom food-app design system |
| **Backend as a Service** | Firebase v11.0.1 | Serverless backend powering real-time data sync, security, and authentication |
| **Database** | Google Cloud Firestore | NoSQL document database utilizing `onSnapshot` real-time WebSocket listeners |
| **Authentication** | Firebase Authentication | Secure authentication via Email/Password & Google OAuth popup |
| **Scanner Engine** | `html5-qrcode` (v2.x) | Browser-based camera QR code decoding for fast table detection |
| **Email Service** | EmailJS Browser SDK | Client-triggered SMTP invoice delivery to student email addresses |
| **PDF Generation** | jsPDF & jsPDF-AutoTable | Client-side dynamic PDF invoice formatting and rendering engine |
| **Typography & Icons** | Google Fonts (Inter), FontAwesome 6 | Clean corporate typography and high-dpi vector iconography |
| **Hosting & CI/CD** | GitHub Pages / Firebase Hosting | Static edge CDN deployment with global availability |

---

### System Architecture Flow

```mermaid
flowchart TD
    subgraph Client ["Client Interface (Browser)"]
        A["Student / Diner"]
        B["Kitchen Staff / Admin"]
    end

    subgraph Auth ["Authentication (Firebase Auth)"]
        AUTH1["Google OAuth 2.0"]
        AUTH2["Email & Password Auth"]
    end

    subgraph Data ["Cloud Database (Cloud Firestore)"]
        FS1[("Collection: menu")]
        FS2[("Collection: orders")]
    end

    subgraph Services ["Third-Party Integrations"]
        QR["html5-qrcode Engine"]
        EJS["EmailJS SMTP Dispatcher"]
        WA["WhatsApp Messaging Gateway"]
    end

    A -->|1. Authenticate| Auth
    B -->|1. Authenticate| Auth
    A -->|2. Scan Table QR| QR
    QR -->|Set Table Number| A
    A -->|3. Browse Block Menu (A, B, J, K)| FS1
    A -->|4. Place Order| FS2
    FS2 -->|Trigger Order Email| EJS
    FS2 -->|5. Real-Time Sync onSnapshot| B
    B -->|6. Update Status: Ready| FS2
    FS2 -->|Real-Time Status Alert| A
    B -->|7. Send Readiness Alert| WA
    B -->|8. Manage Stock & Items| FS1
```

---

## 📂 Repository Structure

```plaintext
Jirone---Smart-Canteen-Management-System/
├── assets/                          # Static image and media assets
│   ├── canteen-bg.png               # Banner hero background for student view
│   └── login-bg.png                 # Authentication splash visual
├── docs/                            # Comprehensive academic and project documentation
│   ├── Jirone ADTU Canteen Project.pdf
│   ├── Jirone ADTU Canteen Project.pptx
│   ├── Jirone-project-report.pdf
│   └── Project_Report_Template.pages
├── app.js                           # Core application logic, Firestore bindings, and state
├── firebase-config.example.js       # Template configuration for Firebase initialization
├── firebase-config.js               # Local Firebase credentials (ignored by Git)
├── index.html                       # Semantic single-page application structure
├── style.css                        # Modern CSS styling, design tokens, and animations
├── .gitignore                       # Git exclusion rules for API secrets and OS files
└── README.md                        # Project documentation and developer guide
```

---

## ⚡ Setup & Installation

Follow these steps to run the application locally on your workstation:

### 1. Prerequisites
* A modern web browser (Google Chrome, Mozilla Firefox, Safari, Microsoft Edge).
* [Git](https://git-scm.com/) installed on your machine.
* A [Firebase](https://firebase.google.com/) account for Cloud Firestore and Authentication.

### 2. Clone the Repository
```bash
git clone https://github.com/raj-dey/Jirone---Smart-Canteen-Management-System.git
cd Jirone---Smart-Canteen-Management-System
```

### 3. Firebase Configuration
1. Copy the example configuration file:
   ```bash
   cp firebase-config.example.js firebase-config.js
   ```
2. Open `firebase-config.js` and populate your Firebase project credentials:
   ```javascript
   const config = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID",
       measurementId: "YOUR_MEASUREMENT_ID"
   };
   ```
3. In your Firebase Console:
   * **Authentication:** Enable **Email/Password** and **Google** sign-in providers.
   * **Cloud Firestore:** Create a database in production or test mode.
   * **Collections:** The application automatically writes to `menu` and `orders` collections.

### 4. EmailJS Configuration *(Optional for Invoicing)*
If you wish to configure automated email receipts:
1. Create a free account on [EmailJS](https://www.emailjs.com/).
2. Create an Email Service and Email Template with the variables:
   * `{{to_name}}`, `{{to_email}}`, `{{order_id}}`, `{{total_amount}}`, `{{order_date}}`, `{{table_no}}`.
3. Update the EmailJS Public Key, Service ID, and Template ID inside [app.js](file:///Users/rajdey/Downloads/PROJECTS/Jirone-project/app.js).

### 5. Launch Locally
Since ES6 modules are used, launch the project using any local HTTP development server:

* **Using Python:**
  ```bash
  python3 -m http.server 8000
  ```
* **Using Node `npx serve`:**
  ```bash
  npx serve .
  ```
* **Using VS Code / Antigravity IDE:**
  Right-click on `index.html` and click **"Open with Live Server"**.

Visit `http://localhost:8000` in your browser.

---

## 🔐 Role-Based Access Control (RBAC)

The system features a dual-tier permission model:

* **Student Role:** Automatically assigned to registered students upon signup or Google OAuth. Grants access to the digital menu, block selector, QR scanner, shopping cart, and personal order tracking.
* **Administrator Role:** Assigned to designated university administrative emails (e.g., `rajdey.btcs@adtu.in`). Automatically unlocks the Admin Navigation Bar, Live Kitchen Order Pipeline, WhatsApp broadcast triggers, and the Dynamic Menu Editor.

---

## 📖 Project Documentation & Reports

Full project reports, architecture blueprints, and presentation slides are preserved inside the [`docs/`](docs/) directory:

| Document | Format | Description |
| :--- | :--- | :--- |
| **Jirone Project Report** | `PDF` | Complete academic technical documentation covering methodology, schema design, and operational impact. |
| **ADTU Canteen Presentation** | `PPTX` / `PDF` | Architectural walkthrough slide deck prepared for university stakeholders. |
| **Report Source Template** | `PAGES` | Editable original template for academic submissions. |

---

## 🔮 Future Roadmap

- [ ] **Direct Payment Gateway:** Live online payment completion via Razorpay SDK integration.
- [ ] **Token Display Screen:** Dedicated full-screen TV dashboard for canteen collection counters.
- [ ] **Push Notifications:** Browser Web Push alerts for order readiness using Firebase Cloud Messaging (FCM).
- [ ] **Kitchen Analytics:** Daily revenue metrics, peak-hour order distribution graphs, and popular item reports.
- [ ] **Inventory Low-Stock Alerts:** Automated warning thresholds for raw kitchen ingredients.

---

## 👨‍💻 Author & Attribution

**Raj Dey**  
*B.Tech in Computer Science & Engineering*  
**Assam Down Town University (ADTU)**, Guwahati, Assam, India  

* **GitHub:** [@raj-dey](https://github.com/raj-dey)
* **Project Repository:** [Jirone - Smart Canteen Management System](https://github.com/raj-dey/Jirone---Smart-Canteen-Management-System)
* **Live Deployment:** [https://raj-dey.github.io/Jirone---Smart-Canteen-Management-System/](https://raj-dey.github.io/Jirone---Smart-Canteen-Management-System/)

---

## 📄 License

This project is released under the [MIT License](LICENSE). Feel free to use, customize, and extend it for academic and institutional research.
