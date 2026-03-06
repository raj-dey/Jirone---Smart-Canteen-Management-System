## Jirone - Smart canteen management System

Jirone is a specialized web-based canteen management application designed for Assam Down Town University (ADTU). It streamlines the dining experience for students while providing a robust, real-time administrative dashboard for canteen staff to manage orders and menu availability.

## 📸 Project Preview

👉  https://raj-dey.github.io/Jirone---Smart-Canteen-Management-System/


## Core Features
### For Students
Block-Specific Menus: Students can filter food items based on their location within the university, specifically for Blocks A, B, J, and K.

Real-Time Order Tracking: High-fidelity status updates from "Pending" to "Ready" using Firestore real-time listeners.

Table-Side Ordering: Integrated QR Code Scanner for quick table identification and manual table selection.

Smart Search & Filters: Search for specific dishes or filter by dietary preferences such as Veg and Non-Veg.

Automated Invoicing: Digital invoices are generated and sent directly to the student's registered email upon order completion.

### For Administrators
Live Order Dashboard: View and manage incoming orders in real-time with the ability to mark items as "Ready" for collection.

Dynamic Menu Management: Add new food items with custom categories, prices, and multi-block availability.

Stock Control: Instantly toggle "In-Stock" or "Sold Out" status for any menu item to manage kitchen inventory.

Customer Engagement: Integrated WhatsApp shortcuts to notify students when their order is ready.

## Technical Stack
Frontend: HTML5, CSS3 (Custom UI inspired by modern food delivery apps), and Vanilla JavaScript (ES6+ Modules).

Backend-as-a-Service: Firebase 11.0.1.

Firestore: Real-time NoSQL database for orders and menu data.

Authentication: Secure login via Email/Password and Google Sign-In.

External APIs & Libraries:

EmailJS: For automated SMTP email delivery.

Html5-Qrcode: For browser-based QR code scanning.

jsPDF: For PDF invoice generation.

## Architecture & Security
The application utilizes a Dual-Role Permission System. Administrative access is strictly controlled via email verification, granting full management rights to authorized accounts. The system leverages Firebase Offline Persistence, allowing for a smoother user experience even during minor network fluctuations.

## Setup & Installation
Clone the Repository:

Bash
git clone https://github.com/raj-dey/Jirone---Smart-Canteen-Management-System.git
Configure Firebase:
Update the firebase-config.js file with your project's specific API Key, Auth Domain, and Project ID.

Deploy:
The project is a static web application and can be hosted on Firebase Hosting, Netlify, or GitHub Pages.

## Developer
Raj Dey

B.Tech Computer Science & Engineering

Assam Down Town University
