import { useState } from "react";
import { ChevronLeft, CheckCircle, X, Download, AlertTriangle, Ticket } from "lucide-react";

export default function BookingsView({ bookings, onCancel, onBack, onDownload }) {
  const [cancelId, setCancelId] = useState(null);
  const [toast,    setToast]    = useState("");

  const doCancel = () => {
    onCancel(cancelId);
    setCancelId(null);
    setToast("Booking cancelled. Refund in 5–7 business days.");
    setTimeout(() => setToast(""), 4000);
  };

  return (
    <div style={{ padding: "20px 16px", maxWidth: 600, margin: "0 auto" }}>
      <button onClick={onBack} style={{
        background: "none", border: "none", color: "#9CA3AF", cursor: "pointer",
        display: "flex", alignItems: "center", gap: 6, fontSize: 13, marginBottom: 18, padding: 0, fontFamily: "inherit"
      }}>
        <ChevronLeft size={16}/> Back to Events
      </button>
      <h2 style={{ fontFamily: "Cormorant Garamond,serif", color: "#F9FAFB", fontSize: 28, margin: "0 0 20px" }}>
        My Bookings
      </h2>

      {/* Success toast */}
      {toast && (
        <div style={{
          background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)",
          borderRadius: 10, padding: "10px 14px", marginBottom: 14,
          color: "#86EFAC", fontSize: 13, display: "flex", alignItems: "center", gap: 8
        }}>
          <CheckCircle size={15}/> {toast}
        </div>
      )}

      {/* Empty state */}
      {bookings.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#4B5563" }}>
          <Ticket size={48} style={{ marginBottom: 12, opacity: .3 }}/>
          <p style={{ fontSize: 15 }}>No bookings yet. Book your first event!</p>
        </div>
      ) : bookings.map(b => (
        <div key={b.id} style={{
          background: "#111827", borderRadius: 14,
          border: `1px solid ${b.cancelled ? "#374151" : "#1F2937"}`,
          padding: 16, marginBottom: 14, opacity: b.cancelled ? .65 : 1
        }}>
          <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <span style={{ fontSize: 32, lineHeight: 1 }}>{b.event.emoji}</span>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ color: "#F9FAFB", fontWeight: 700, fontSize: 16, marginBottom: 3 }}>{b.event.title}</div>
                  <div style={{ color: "#9CA3AF", fontSize: 12, marginBottom: 1 }}>{b.event.date} · {b.event.time}</div>
                  <div style={{ color: "#9CA3AF", fontSize: 12, marginBottom: 6 }}>{b.event.venue}</div>
                  <div style={{ color: "#6B7280", fontSize: 11 }}>Seats: {b.seats.join(", ")} · {b.id}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ color: "#D4AF37", fontWeight: 700, fontSize: 16 }}>₹{b.total.toLocaleString()}</div>
                  <div style={{
                    marginTop: 6, fontSize: 10, fontWeight: 700, letterSpacing: 1,
                    color:      b.cancelled ? "#F87171" : "#4ADE80",
                    background: b.cancelled ? "rgba(239,68,68,0.12)" : "rgba(74,222,128,0.12)",
                    padding: "3px 8px", borderRadius: 5
                  }}>
                    {b.cancelled ? "CANCELLED" : "CONFIRMED"}
                  </div>
                </div>
              </div>

              {!b.cancelled && (
                <div style={{ borderTop: "1px solid #1F2937", paddingTop: 12, marginTop: 12, display: "flex", gap: 10 }}>
                  <button onClick={() => setCancelId(b.id)} style={{
                    flex: 1, padding: "8px 0", background: "transparent",
                    border: "1px solid rgba(239,68,68,0.4)", color: "#F87171",
                    borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600,
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontFamily: "inherit"
                  }}>
                    <X size={13}/> Cancel Ticket
                  </button>
                  <button onClick={() => onDownload(b)} style={{
                    flex: 1, padding: "8px 0", background: "transparent",
                    border: "1px solid #374151", color: "#9CA3AF",
                    borderRadius: 8, cursor: "pointer", fontSize: 12,
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontFamily: "inherit"
                  }}>
                    <Download size={13}/> Download
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Cancellation confirmation modal */}
      {cancelId && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 20
        }}>
          <div style={{
            background: "#111827", borderRadius: 18, border: "1px solid #374151",
            padding: 28, maxWidth: 340, width: "100%", textAlign: "center"
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: "50%", background: "rgba(239,68,68,0.12)",
              display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px"
            }}>
              <AlertTriangle size={24} color="#F87171"/>
            </div>
            <h3 style={{ color: "#F9FAFB", fontSize: 18, margin: "0 0 10px" }}>Cancel Ticket?</h3>
            <p style={{ color: "#9CA3AF", fontSize: 13, lineHeight: 1.6, margin: "0 0 20px" }}>
              A 15% cancellation fee applies. Your refund will be credited in 5–7 business days.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setCancelId(null)} style={{
                flex: 1, padding: "11px 0", background: "transparent",
                border: "1px solid #374151", color: "#9CA3AF", borderRadius: 10,
                cursor: "pointer", fontWeight: 600, fontFamily: "inherit"
              }}>Keep Ticket</button>
              <button onClick={doCancel} style={{
                flex: 1, padding: "11px 0", background: "#EF4444",
                border: "none", color: "white", borderRadius: 10,
                cursor: "pointer", fontWeight: 700, fontFamily: "inherit"
              }}>Yes, Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
