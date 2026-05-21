# 🎭 TicketLux — Event Ticketing System

> A full-stack React mini project for booking movies and concerts — with seat selection, QR tickets, smart seat recommendations, and live flash deals.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat&logo=vite)
![Deployed](https://img.shields.io/badge/Deployed-Vercel-000000?style=flat&logo=vercel)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

---

## 📌 Table of Contents

- [Overview](#overview)
- [Live Demo](#live-demo)
- [Features](#features)
- [Custom Features](#custom-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [How It Works](#how-it-works)
- [Screens & Flow](#screens--flow)
- [Deployment](#deployment)
- [Future Improvements](#future-improvements)

---

## Overview

**TicketLux** is a single-page React application that simulates a professional event ticketing platform. Users can browse movies and concerts in Mumbai, select seats on an interactive map, pay for tickets, receive a QR-coded booking confirmation, and manage their bookings — all within a seamless dark-themed UI.

Built as a mini project to demonstrate React component architecture, state management, custom hooks, Canvas API usage, and production-level file organization.

---

## Live Demo

| Platform | Link |
|---|---|
| Vercel (Live App) | `https://ticket-app.vercel.app` |
| GitHub (Source Code) | `https://github.com/lokeshrathod2007/ticket-app` |

---

## Features

The project implements 8 core features plus 2 custom features**:

### Core Features

| # | Feature | Description |
|---|---|---|
| 1 | Interactive Seat Map** | 10-row × 12-seat grid with VIP / Standard / Economy pricing tiers. Click to select, click again to deselect. Pre-booked seats are locked. |
| 2 | QR Code Booking Confirmation** | Every confirmed booking generates a unique SVG QR code deterministically from the booking ID. Displayed on the confirmation screen. |
| 3 | Venue & Timing Details** | A modal with an SVG street map, full address, phone, date, time, facilities list, and a Google Maps deep-link for directions. |
| 4 | Ticket Cancellation Workflow** | Cancel any booking with a confirmation modal. Shows a 15% cancellation fee warning and updates booking status to CANCELLED instantly. |
| 5 | Pricing Categories** | Three tiers: VIP (rows A–C), Standard (rows D–G), Economy (rows H–J). Each row displays its price per seat. |
| 6 | User Booking History** | "My Bookings" screen lists all past bookings with CONFIRMED / CANCELLED status badges, seat details, and booking IDs. |
| 7 | Payment Method Selection** | Choose from Credit/Debit Card, UPI, Net Banking, or Wallet. Card selection shows a live-formatted card number input form. |
| 8 | Directions / Map Integration** | Venue modal includes an SVG representation of the street map and a "Get Directions" button linking to Google Maps. |

### Custom Features

| # | Feature | Description |
|---|---|---|
| 9 | Smart Seat Recommender** | Algorithm-based picker — choose your budget tier and position preference, and it instantly finds the best 2 adjacent available seats. |
| 10 | Flash Deal Countdown** | Time-limited discount badges that count down in real-time using `setInterval`. Users can apply the discount to their seat total before checkout. |

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | UI components, hooks (`useState`, `useEffect`, `useRef`), state management |
| **Vite** | Development server, build tool, hot module replacement |
| **Lucide React** | Icon library — 20+ icons used across the UI |
| **Canvas API** | Generates downloadable PNG ticket with QR pattern, event details, and branding |
| **SVG** | QR code generation, venue street map, seat UI elements |
| **Google Fonts** | Cormorant Garamond (headings) + Outfit (body) |
| **CSS-in-JS** | All styling via inline styles — no external CSS framework |

---

## Project Structure

```
ticket-app/
├── public/
├── src/
│   ├── data/
│   │   └── events.js              # All event data, seat config, payment methods
│   │
│   ├── utils/
│   │   ├── helpers.js             # genBookingId(), tierPrice()
│   │   └── downloadTicket.js      # Canvas-based PNG ticket generator
│   │
│   ├── components/
│   │   ├── QRCodeSVG.jsx          # Deterministic SVG QR code from booking ID
│   │   ├── FlashTimer.jsx         # Live countdown timer badge
│   │   ├── VenueModal.jsx         # Venue details overlay with SVG map
│   │   └── SmartRecommender.jsx   # AI-like seat recommendation panel
│   │
│   ├── views/
│   │   ├── EventsView.jsx         # Home — event cards with filter
│   │   ├── SeatMapView.jsx        # Interactive seat grid
│   │   ├── PaymentView.jsx        # Payment method selection + order summary
│   │   ├── ConfirmationView.jsx   # Booking confirmed + QR ticket
│   │   └── BookingsView.jsx       # Booking history + cancellation modal
│   │
│   ├── App.jsx                    # Root — state management + navbar + routing
│   ├── main.jsx                   # React DOM entry point
│   └── index.css                  # Global CSS reset
│
├── index.html
├── package.json
└── vite.config.js
```

---

## Getting Started

### Prerequisites

- Node.js v18 or higher — [download here](https://nodejs.org)
- Git — [download here](https://git-scm.com)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/lokeshrathod2007/ticket-app.git

# 2. Navigate into the project
cd ticket-app

# 3. Install dependencies
npm install

# 4. Install icon library
npm install lucide-react

# 5. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The output will be in the `dist/` folder, ready for deployment.

---

## How It Works

### State Management

All application state lives in `App.jsx` and is passed down to views as props:

```
App.jsx
 ├── view          → controls which screen is shown
 ├── selectedEvent → the event the user clicked
 ├── selectedSeats → array of seat IDs e.g. ["D3", "D4"]
 ├── total         → calculated price after discounts
 ├── bookings      → array of all booking objects
 ├── currentBooking→ the most recent booking (for confirmation screen)
 └── venueEvent    → the event whose venue modal is open
```

### Seat Map Logic

- Rows A–C → VIP tier
- Rows D–G → Standard tier
- Rows H–J → Economy tier
- A hardcoded `Set` of pre-booked seat IDs prevents selection
- Selected seats are stored as strings like `"E5"`, `"E6"`
- Flash discount is applied as a percentage of the base total

### QR Code Generation

The QR code is generated purely in JavaScript without any external library:

1. A seed is derived from the booking ID string using a hash function
2. A linear congruential generator (LCG) fills a 21×21 boolean grid
3. Three finder patterns are drawn at the QR code corners (top-left, top-right, bottom-left)
4. Timing patterns are added on row 6 and column 6
5. The grid is rendered as an SVG (for display) or drawn on a Canvas (for PNG download)

### Smart Seat Recommender Algorithm

```
1. User selects: tier (vip / standard / economy) + position (front / middle / back)
2. Map tier → candidate rows
   vip      → ["A", "B", "C"]
   standard → ["D", "E", "F", "G"]
   economy  → ["H", "I", "J"]
3. Map position → specific row within tier
   front  → first row of tier
   middle → middle rows of tier
   back   → last row of tier
4. Loop through candidate rows:
   For each seat 1..11:
     If seat[N] and seat[N+1] are both available → return [seatN, seatN+1]
5. Highlight the found pair on the seat map
```

### Download Ticket

Uses the browser's Canvas API to paint a full ticket:
- Event title, genre, duration
- Detail grid: date, time, venue, seats, booking ID, amount
- A unique QR pattern drawn pixel by pixel
- TicketLux branding in the footer
- Exported as `TicketLux-TKTXXXXXX.png` via a hidden `<a>` tag click

---

## Screens & Flow

```
[ Events List ]
      │
      ▼ Book Now
[ Seat Map ]  ←──────────────────────── [ Venue Modal ]
      │
      ▼ Proceed
[ Payment ]
      │
      ▼ Pay
[ Confirmation + QR ]
      │
      ▼ My Bookings
[ Booking History ]
      │
      ▼ Cancel Ticket
[ Cancellation Modal ]
```

### Events Available

| Event | Type | Venue | Price (from) |
|---|---|---|---|
| Interstellar: IMAX Re-Release | Movie | PVR IMAX, Phoenix Mall | ₹500 |
| Coldplay: Music of the Spheres | Concert | DY Patil Stadium | ₹2,000 |
| Dune: Part Three | Movie | INOX Megaplex, Andheri | ₹400 |
| AR Rahman: Symphony Live | Concert | NSCI Dome, Worli | ₹1,000 |

---

## Deployment

This project is deployed on **Vercel** with automatic deployments on every push to `main`.

### Deploy Your Own

```bash
# 1. Push to GitHub
git add .
git commit -m "Initial commit"
git push -u origin main

# 2. Go to vercel.com
# 3. Click "Add New Project"
# 4. Import your GitHub repo
# 5. Vercel auto-detects Vite — click Deploy
# 6. Your app is live in ~60 seconds
```

Every future push to `main` triggers an automatic redeploy.

---

## Future Improvements

- [ ] Add React Router for proper URL-based navigation
- [ ] Connect to a real backend (Node.js + Express + MongoDB)
- [ ] Add user authentication (login / signup)
- [ ] Integrate a real payment gateway (Razorpay / Stripe)
- [ ] Add email confirmation after booking
- [ ] Add seat hold timer (seats reserved for 10 minutes)
- [ ] Add multi-language support (Hindi / Tamil)
- [ ] Add real Google Maps embed for venue directions
- [ ] Add a real QR code library (qrcode.js) for scannable codes
- [ ] Add admin panel for managing events and bookings

---

## Author

**Lokesh Rathod**  
Mini Project — React JS  
Mumbai.

---

## License

This project is open source and available under the [MIT License](LICENSE).
