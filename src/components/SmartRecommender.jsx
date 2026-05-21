import { useState } from "react";
import { Sparkles } from "lucide-react";
import { SEATS_PER_ROW, PREBOOKED } from "../data/events";

export default function SmartRecommender({ event, selectedSeats, onRecommend }) {
  const [open, setOpen]  = useState(false);
  const [tier, setTier]  = useState("standard");
  const [pos,  setPos]   = useState("middle");

  const recommend = () => {
    const tierRows = { vip: ["A","B","C"], standard: ["D","E","F","G"], economy: ["H","I","J"] };
    const posMap   = { front: [0], middle: [1, 2], back: [-1] };

    const base       = tierRows[tier];
    const candidates = posMap[pos].map(i => base.at(i)).filter(Boolean);
    const pool       = candidates.length ? candidates : base;

    let found = [];
    for (const row of pool) {
      for (let i = 1; i <= SEATS_PER_ROW - 1; i++) {
        const s1 = `${row}${i}`, s2 = `${row}${i + 1}`;
        if (!PREBOOKED.has(s1) && !PREBOOKED.has(s2) &&
            !selectedSeats.includes(s1) && !selectedSeats.includes(s2)) {
          found = [s1, s2];
          break;
        }
      }
      if (found.length) break;
    }

    if (found.length) { onRecommend(found); setOpen(false); }
  };

  const priceMap = { vip: event.vipPrice, standard: event.standardPrice, economy: event.economyPrice };

  return (
    <div style={{ marginBottom: 16 }}>
      <button onClick={() => setOpen(!open)} style={{
        background: "linear-gradient(135deg,#7C3AED,#4F46E5)", color: "white",
        border: "none", borderRadius: 10, padding: "10px 18px",
        fontWeight: 700, cursor: "pointer", display: "flex",
        alignItems: "center", gap: 8, fontSize: 13, width: "100%"
      }}>
        <Sparkles size={15}/> Smart Seat Recommender — Let AI pick for you
      </button>

      {open && (
        <div style={{
          background: "#1A1230", border: "1px solid #7C3AED55",
          borderRadius: 12, padding: 16, marginTop: 8
        }}>
          <p style={{ color: "#A78BFA", fontSize: 12, margin: "0 0 12px" }}>
            Best 2 adjacent seats based on your preferences
          </p>

          {/* Tier selector */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ color: "#6B7280", fontSize: 11, marginBottom: 7, fontWeight: 600, letterSpacing: 1 }}>
              BUDGET TIER
            </div>
            <div style={{ display: "flex", gap: 7 }}>
              {["vip","standard","economy"].map(t => (
                <button key={t} onClick={() => setTier(t)} style={{
                  flex: 1, padding: "7px 0", borderRadius: 8, border: "1px solid",
                  borderColor: tier === t ? "#7C3AED" : "#374151",
                  background:  tier === t ? "#7C3AED22" : "transparent",
                  color:       tier === t ? "#C4B5FD" : "#6B7280",
                  fontSize: 11, cursor: "pointer",
                  fontWeight:  tier === t ? 700 : 400, textTransform: "capitalize"
                }}>
                  {t}<br/><span style={{ opacity: .7 }}>₹{priceMap[t]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Position selector */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ color: "#6B7280", fontSize: 11, marginBottom: 7, fontWeight: 600, letterSpacing: 1 }}>
              PREFERRED POSITION
            </div>
            <div style={{ display: "flex", gap: 7 }}>
              {["front","middle","back"].map(p => (
                <button key={p} onClick={() => setPos(p)} style={{
                  flex: 1, padding: "7px 0", borderRadius: 8, border: "1px solid",
                  borderColor: pos === p ? "#7C3AED" : "#374151",
                  background:  pos === p ? "#7C3AED22" : "transparent",
                  color:       pos === p ? "#C4B5FD" : "#6B7280",
                  fontSize: 11, cursor: "pointer",
                  fontWeight:  pos === p ? 700 : 400, textTransform: "capitalize"
                }}>{p}</button>
              ))}
            </div>
          </div>

          <button onClick={recommend} style={{
            width: "100%", padding: "10px 0",
            background: "linear-gradient(135deg,#7C3AED,#4F46E5)",
            color: "white", border: "none", borderRadius: 8,
            fontWeight: 700, cursor: "pointer", fontSize: 14
          }}>
            ✨ Find Best Seats
          </button>
        </div>
      )}
    </div>
  );
}
