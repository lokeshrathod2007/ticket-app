import { useState } from "react";
import { MapPin, Ticket } from "lucide-react";

// Views
import EventsView       from "./views/EventsView";
import SeatMapView      from "./views/SeatMapView";
import PaymentView      from "./views/PaymentView";
import ConfirmationView from "./views/ConfirmationView";
import BookingsView     from "./views/BookingsView";

// Components
import VenueModal from "./components/VenueModal";

// Utilities
import { genBookingId }   from "./utils/helpers";
import { downloadTicket } from "./utils/downloadTicket";

export default function App() {
  // ── Navigation state ──────────────────────────
  const [view, setView] = useState("events"); // events | seats | payment | confirmation | bookings

  // ── Booking flow state ────────────────────────
  const [selectedEvent,  setSelectedEvent]  = useState(null);
  const [selectedSeats,  setSelectedSeats]  = useState([]);
  const [total,          setTotal]          = useState(0);
  const [currentBooking, setCurrentBooking] = useState(null);

  // ── Persistent data ───────────────────────────
  const [bookings,   setBookings]   = useState([]);
  const [venueEvent, setVenueEvent] = useState(null); // controls venue modal

  // ── Handlers ──────────────────────────────────
  const handleSelectEvent = ev => {
    setSelectedEvent(ev);
    setView("seats");
  };

  const handleSeatConfirm = (seats, amt) => {
    setSelectedSeats(seats);
    setTotal(amt);
    setView("payment");
  };

  const handlePay = method => {
    const booking = {
      id:            genBookingId(),
      event:         selectedEvent,
      seats:         selectedSeats,
      total,
      paymentMethod: method,
      cancelled:     false
    };
    setCurrentBooking(booking);
    setBookings(prev => [booking, ...prev]);
    setView("confirmation");
  };

  const handleCancel = id =>
    setBookings(prev => prev.map(b => b.id === id ? { ...b, cancelled: true } : b));

  const activeBookingCount = bookings.filter(b => !b.cancelled).length;

  return (
    <div style={{ minHeight: "100vh", background: "#0B0B12", fontFamily: "Outfit,sans-serif", color: "#F9FAFB" }}>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Outfit:wght@300;400;600;700;800&display=swap"
        rel="stylesheet"
      />

      {/* ── Navbar ── */}
      <nav style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "14px 20px", borderBottom: "1px solid #1F2937",
        background: "rgba(11,11,18,0.95)", position: "sticky", top: 0, zIndex: 50,
        backdropFilter: "blur(10px)"
      }}>
        {/* Logo */}
        <button onClick={() => setView("events")} style={{
          fontFamily: "Cormorant Garamond,serif", color: "#D4AF37", fontSize: 20,
          fontWeight: 700, background: "none", border: "none", cursor: "pointer",
          padding: 0, display: "flex", alignItems: "center", gap: 8
        }}>
          🎭 TicketLux
        </button>

        {/* Right side */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {/* Location badge */}
          <span style={{
            color: "#D4AF37", fontSize: 12, fontWeight: 600,
            display: "flex", alignItems: "center", gap: 5,
            background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.3)",
            padding: "5px 12px", borderRadius: 20
          }}>
            <MapPin size={12} color="#D4AF37"/> Mumbai
          </span>

          {/* My Bookings button */}
          <button onClick={() => setView("bookings")} style={{
            background: "#1F2937", border: "none", borderRadius: 8,
            color: "#9CA3AF", padding: "7px 14px", cursor: "pointer",
            fontSize: 12, fontWeight: 600,
            display: "flex", alignItems: "center", gap: 6, fontFamily: "inherit"
          }}>
            <Ticket size={13}/> My Bookings
            {activeBookingCount > 0 && (
              <span style={{
                background: "#D4AF37", color: "#0a0a0a", borderRadius: "50%",
                minWidth: 18, height: 18, display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 10, fontWeight: 800, padding: "0 3px"
              }}>
                {activeBookingCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* ── Views ── */}
      {view === "events" && (
        <EventsView
          onSelect={handleSelectEvent}
          onVenue={ev => setVenueEvent(ev)}
        />
      )}

      {view === "seats" && selectedEvent && (
        <SeatMapView
          event={selectedEvent}
          onConfirm={handleSeatConfirm}
          onBack={() => setView("events")}
          onVenue={() => setVenueEvent(selectedEvent)}
        />
      )}

      {view === "payment" && selectedEvent && (
        <PaymentView
          event={selectedEvent}
          seats={selectedSeats}
          total={total}
          onPay={handlePay}
          onBack={() => setView("seats")}
        />
      )}

      {view === "confirmation" && currentBooking && (
        <ConfirmationView
          booking={currentBooking}
          onViewBookings={() => setView("bookings")}
          onDownload={downloadTicket}
        />
      )}

      {view === "bookings" && (
        <BookingsView
          bookings={bookings}
          onCancel={handleCancel}
          onBack={() => setView("events")}
          onDownload={downloadTicket}
        />
      )}

      {/* ── Venue Modal (rendered on top of any view) ── */}
      {venueEvent && (
        <VenueModal
          event={venueEvent}
          onClose={() => setVenueEvent(null)}
        />
      )}
    </div>
  );
}
