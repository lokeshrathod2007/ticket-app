import { useState } from "react";
import { ChevronLeft, MapPin, Zap } from "lucide-react";
import { ROWS, SEATS_PER_ROW, ROW_TIER, PREBOOKED, TIER_INFO } from "../data/events";
import { tierPrice } from "../utils/helpers";
import SmartRecommender from "../components/SmartRecommender";

export default function SeatMapView({ event, onConfirm, onBack, onVenue }) {
  const [selected,      setSelected]      = useState([]);
  const [flashApplied,  setFlashApplied]  = useState(false);

  const toggle = id => {
    if (PREBOOKED.has(id)) return;
    setSelected(p => p.includes(id) ? p.filter(s => s !== id) : [...p, id]);
  };

  const baseTotal    = selected.reduce((sum, id) => sum + tierPrice(event, ROW_TIER[id[0]]), 0);
  const discountAmt  = flashApplied ? Math.round(baseTotal * event.flashDiscount / 100) : 0;
  const total        = baseTotal - discountAmt;

  return (
    <div style={{ padding: "20px 16px", maxWidth: 820, margin: "0 auto" }}>
      {/* Back button */}
      <button onClick={onBack} style={{
        background: "none", border: "none", color: "#9CA3AF", cursor: "pointer",
        display: "flex", alignItems: "center", gap: 6, fontSize: 13, marginBottom: 18, padding: 0, fontFamily: "inherit"
      }}>
        <ChevronLeft size={16}/> Back to Events
      </button>

      {/* Title row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
        <div>
          <h2 style={{ fontFamily: "Cormorant Garamond,serif", color: "#F9FAFB", fontSize: 26, margin: 0 }}>{event.title}</h2>
          <p style={{ color: "#9CA3AF", fontSize: 13, margin: "4px 0 0" }}>{event.date} · {event.time} · {event.venue}</p>
        </div>
        <button onClick={onVenue} style={{
          background: "#1F2937", border: "none", borderRadius: 8, padding: "8px 12px",
          color: "#9CA3AF", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontFamily: "inherit"
        }}>
          <MapPin size={13}/> Venue Info
        </button>
      </div>

      {/* Screen / Stage indicator */}
      <div style={{ textAlign: "center", margin: "24px 0 20px" }}>
        <div style={{ background: "linear-gradient(90deg,transparent,#D4AF37,transparent)", height: 3, width: "70%", margin: "0 auto", borderRadius: 4, opacity: .6 }}/>
        <p style={{ color: "#6B7280", fontSize: 11, marginTop: 6, letterSpacing: 2, fontWeight: 600 }}>
          {event.type === "movie" ? "— SCREEN —" : "— STAGE —"}
        </p>
      </div>

      {/* Smart Recommender */}
      <SmartRecommender event={event} selectedSeats={selected} onRecommend={s => setSelected(s)}/>

      {/* Seat grid */}
      <div style={{ overflowX: "auto" }}>
        <div style={{ minWidth: 420 }}>
          {ROWS.map(row => (
            <div key={row} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 7 }}>
              <span style={{ color: "#4B5563", fontSize: 11, width: 16, textAlign: "center", flexShrink: 0 }}>{row}</span>
              <div style={{ display: "flex", gap: 4, flex: 1, justifyContent: "center" }}>
                {[...Array(SEATS_PER_ROW)].map((_, i) => {
                  const id   = `${row}${i + 1}`;
                  const tier = ROW_TIER[row];
                  const info = TIER_INFO[tier];
                  const booked = PREBOOKED.has(id);
                  const sel    = selected.includes(id);
                  return (
                    <button key={id} onClick={() => toggle(id)}
                      title={`${id} · ${info.label} · ₹${tierPrice(event, tier)}`}
                      style={{
                        width: 26, height: 22, borderRadius: "5px 5px 2px 2px", padding: 0, outline: "none",
                        border: `1px solid ${booked ? "#2D3748" : sel ? "#D4AF37" : info.border}`,
                        background:    booked ? "#1A2535" : sel ? "#D4AF37" : info.bg,
                        cursor:        booked ? "not-allowed" : "pointer",
                        opacity:       booked ? 0.35 : 1,
                        transform:     sel ? "scale(1.18)" : "scale(1)",
                        transition:    "all 0.12s"
                      }}
                    />
                  );
                })}
              </div>
              <span style={{ color: "#4B5563", fontSize: 10, width: 56, flexShrink: 0 }}>₹{tierPrice(event, ROW_TIER[row])}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 16, flexWrap: "wrap" }}>
        {Object.entries(TIER_INFO).map(([t, info]) => (
          <div key={t} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 15, height: 13, borderRadius: "4px 4px 1px 1px", background: info.bg, border: `1px solid ${info.border}` }}/>
            <span style={{ color: "#9CA3AF", fontSize: 11 }}>{info.label}</span>
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 15, height: 13, borderRadius: "4px 4px 1px 1px", background: "#1A2535", border: "1px solid #2D3748", opacity: .35 }}/>
          <span style={{ color: "#9CA3AF", fontSize: 11 }}>Booked</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 15, height: 13, borderRadius: "4px 4px 1px 1px", background: "#D4AF37", border: "1px solid #D4AF37" }}/>
          <span style={{ color: "#9CA3AF", fontSize: 11 }}>Selected</span>
        </div>
      </div>

      {/* Flash deal banner */}
      {event.hasFlashDeal && selected.length > 0 && (
        <div style={{
          background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)",
          borderRadius: 12, padding: "12px 16px", marginTop: 16,
          display: "flex", justifyContent: "space-between", alignItems: "center"
        }}>
          <div>
            <div style={{ color: "#F87171", fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
              <Zap size={13}/> Flash Deal Active!
            </div>
            <div style={{ color: "#6B7280", fontSize: 12, marginTop: 2 }}>
              {event.flashDiscount}% off — save ₹{Math.round(baseTotal * event.flashDiscount / 100).toLocaleString()}
            </div>
          </div>
          <button onClick={() => setFlashApplied(f => !f)} style={{
            padding: "7px 16px", borderRadius: 8, border: "1px solid #EF4444",
            background: flashApplied ? "#EF4444" : "transparent",
            color:      flashApplied ? "white" : "#EF4444",
            cursor: "pointer", fontWeight: 700, fontSize: 12, fontFamily: "inherit"
          }}>
            {flashApplied ? "✓ Applied" : "Apply"}
          </button>
        </div>
      )}

      {/* Sticky bottom bar */}
      {selected.length > 0 && (
        <div style={{
          position: "sticky", bottom: 0, background: "#111827",
          borderTop: "1px solid #1F2937", marginTop: 20, padding: "16px 0",
          display: "flex", justifyContent: "space-between", alignItems: "center"
        }}>
          <div>
            <div style={{ color: "#6B7280", fontSize: 12 }}>
              {selected.length} seat{selected.length > 1 ? "s" : ""}: {selected.join(", ")}
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              <span style={{ color: "#D4AF37", fontWeight: 800, fontSize: 22 }}>₹{total.toLocaleString()}</span>
              {flashApplied && <span style={{ color: "#6B7280", fontSize: 13, textDecoration: "line-through" }}>₹{baseTotal.toLocaleString()}</span>}
            </div>
          </div>
          <button onClick={() => onConfirm(selected, total)} style={{
            background: "linear-gradient(135deg,#D4AF37,#B8962E)", color: "#0a0a0a",
            border: "none", borderRadius: 10, padding: "12px 28px",
            fontWeight: 800, fontSize: 15, cursor: "pointer", fontFamily: "inherit"
          }}>
            Proceed →
          </button>
        </div>
      )}
    </div>
  );
}
