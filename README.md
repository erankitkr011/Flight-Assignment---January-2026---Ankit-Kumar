# ✈️ Flight Booking System – Full Stack Assignment

A production-ready **Flight Booking System backend** built using **Node.js, Express, and MongoDB**, implementing real-world features such as dynamic pricing, wallet-based payments, PDF ticket generation, and booking history.

This project was developed as part of a **Full Stack Developer Technical Assignment**.

---

## 🚀 Features

### 1. Flight Search (Database Driven)
- Flights are stored and fetched directly from **MongoDB**
- No static JSON or external APIs used
- Returns **10 flights per request**
- Search supported by **departure and arrival city**

---

### 2. Dynamic Pricing Engine
- If a flight is booked **3 times within 5 minutes**, price increases by **10%**
- Price automatically resets after the time window
- Base flight price is never modified in the database

---

### 3. Wallet System
- Each user is assigned a wallet with a **default balance of ₹50,000**
- Wallet balance is deducted on successful booking
- Booking fails with a clear validation error if balance is insufficient

---

### 4. Ticket PDF Generation
- A **PDF ticket** is generated after every successful booking
- Ticket includes:
  - Passenger Name
  - Airline & Flight ID
  - Route (Departure → Arrival)
  - Final Price Paid
  - Booking Date & Time
  - Unique PNR
- Ticket can be re-downloaded from booking history

---

### 5. Booking History
- Complete booking history stored in the database
- Each booking includes flight details, amount paid, booking date, and PNR

---

## 🧱 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT (Optional enhancement)
- **PDF Generation:** pdfkit
- **Environment Variables:** dotenv

---

## 📁 Project Structure
```
server/
├── config/ # Database configuration
├── controllers/ # Application logic
├── models/ # MongoDB schemas
├── routes/ # API routes
├── services/ # Pricing & PDF services
├── utils/ # Utility helpers
├── seed/ # Database seed scripts
├── middlewares/ # Auth & error handling
├── server.js
└── package.json
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository
```bash
git clone <your-github-repo-url>
cd server

```

### 2️⃣ Install Dependencies
```bash
npm install

```

### 3️⃣ Environment Variables

Create a .env file inside the server directory:
PORT=4000
MONGO_URI=mongodb://localhost:27017/flightDB
JWT_SECRET=your_secret_key

## 🗃️ Seed Flight Data

### Insert 10–20 flights into the database:
```bash
node seed/seedFlights.js
```

## ▶️ Run the Server
```bash
npm start
```

Server will start at:
http://localhost:4000
🔗 API Endpoints
Flights
GET /api/v1/flight → Get 10 flights
GET /api/v1/flight/search?departureCity=&arrivalCity=
Booking
POST /api/v1/booking → Book a flight
GET /api/v1/booking/history → Get booking history
Wallet
GET /api/v1/wallet → Get wallet balance
🧠 Architecture & Design
Follows MVC architecture
Business logic separated using services
Surge pricing implemented using time-based database queries
Wallet & booking logic handled transactionally
Code written with production-ready practices
🌟 Optional Enhancements Implemented
JWT authentication
Modular service-based structure
Centralized error handling
Reusable utility functions
🔮 Future Improvements
Frontend integration (React)
Sorting & filtering flights
Surge pricing countdown timer
Dockerized deployment
👤 Author
Ankit Kumar
Full Stack Developer
Specialized in Node.js, MongoDB, and system design
✅ Assignment Status
✔ All mandatory requirements implemented
✔ Fully database-driven
✔ Production-ready backend
✔ Clean and maintainable codebase