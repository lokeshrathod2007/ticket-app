import { Download, History, QrCode } from "lucide-react";
import QRCodeSVG from "../components/QRCodeSVG";

export default function ConfirmationView({ booking, onViewBookings, onDownload }) {
  return (
    <div style={{ padding: "32px 16px", maxWidth: 460, margin: "0 auto", textAlign: "center" }}>
      <div style={{ fontSize: 56, marginBottom: 12 }}>🎉</div>
      <h2 style={{ fontFamily: "Cormorant Garamond,serif", color: "#D4AF37", fontSize: 32, margin: "0 0 6px" }}>
        Booking Confirmed!
      </h2>
      <p style={{ color: "#6B7280", marginBottom: 28, fontSize: 14 }}>
        Your ticket is ready. Show QR at the venue entry.
      </p>

      {/* Ticket card */}
      <div style={{
        background: "#111827", borderRadius: 20, overflow: "hidden",
        border: "1px solid rgba(212,175,55,0.25)",
        boxShadow: "0 0 60px rgba(212,175,55,0.08)", textAlign: "left"
      }}>
        {/* Event header */}
        <div style={{ padding: "20px 20px 18px", background: `linear-gradient(135deg,${booking.event.accentColor},#111827)` }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{booking.event.emoji}</div>
          <h3 style={{ color: "#F9FAFB", margin: "0 0 4px", fontSize: 20, fontWeight: 700 }}>{booking.event.title}</h3>
          <p style={{ color: "#9CA3AF", margin: 0, fontSize: 13 }}>{booking.event.genre}</p>
        </div>

        {/* Tear / perforation line */}
        <div style={{ margin: "0 16px", borderTop: "2px dashed #1F2937", position: "relative" }}>
          <div style={{ position: "absolute", left: -28, top: -12, width: 24, height: 24, borderRadius: "50%", background: "#0B0B12" }}/>
          <div style={{ position: "absolute", right: -28, top: -12, width: 24, height: 24, borderRadius: "50%", background: "#0B0B12" }}/>
        </div>

        {/* Detail fields */}
        <div style={{ padding: "16px 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {[
            ["DATE",       booking.event.date],
            ["TIME",       booking.event.time],
            ["VENUE",      booking.event.venue],
            ["SEATS",      booking.seats.join(", ")],
            ["BOOKING ID", booking.id],
            ["AMOUNT",     "₹" + booking.total.toLocaleString()]
          ].map(([l, v]) => (
            <div key={l}>
              <div style={{ color: "#4B5563", fontSize: 9, letterSpacing: 1.2, fontWeight: 700, marginBottom: 3 }}>{l}</div>
              <div style={{ color: "#F9FAFB", fontSize: 12, fontWeight: 600 }}>{v}</div>
            </div>
          ))}
        </div>

        {/* QR code section */}
        <div style={{
          margin: "0 16px", borderTop: "2px dashed #1F2937", padding: "20px 0",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 10
        }}>
          <div style={{ padding: 8, background: "white", borderRadius: 12, boxShadow: "0 0 30px rgba(212,175,55,0.2)" }}>
            <QRCodeSVG data={booking.id + booking.seats.join("") + booking.total} size={130}/>
          </div>
          <div style={{ color: "#4B5563", fontSize: 11, display: "flex", alignItems: "center", gap: 5 }}>
            <QrCode size={12}/> Scan this QR at venue entry
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
        <button onClick={onViewBookings} style={{
          flex: 1, padding: "12px 0", background: "transparent",
          border: "1px solid #374151", color: "#9CA3AF", borderRadius: 10,
          fontWeight: 600, cursor: "pointer", fontSize: 14, fontFamily: "inherit"
        }}>
          <History size={14} style={{ verticalAlign: -2 }}/> My Bookings
        </button>
        <button onClick={() => onDownload(booking)} style={{
          flex: 1, padding: "12px 0",
          background: "linear-gradient(135deg,#D4AF37,#B8962E)",
          border: "none", color: "#0a0a0a", borderRadius: 10,
          fontWeight: 700, cursor: "pointer", fontSize: 14, fontFamily: "inherit"
        }}>
          <Download size={14} style={{ verticalAlign: -2 }}/> Download Ticket
        </button>
      </div>
    </div>
  );
}
