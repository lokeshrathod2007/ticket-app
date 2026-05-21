import { useState } from "react";
import { Film, Music, MapPin, Calendar, Star } from "lucide-react";
import { EVENTS } from "../data/events";
import FlashTimer from "../components/FlashTimer";

export default function EventsView({ onSelect, onVenue }) {
  const [filter, setFilter] = useState("all");
  const filtered = EVENTS.filter(e => filter === "all" || e.type === filter);

  return (
    <div>
      {/* Hero header */}
      <div style={{ textAlign: "center", padding: "40px 20px 24px", background: "linear-gradient(180deg,#0d0d1a,#0B0B12)" }}>
        <div style={{ fontSize: 42, marginBottom: 8 }}>🎭</div>
        <h1 style={{
          fontFamily: "Cormorant Garamond,serif", fontSize: 44, fontWeight: 700,
          background: "linear-gradient(135deg,#D4AF37,#F5D066)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          margin: 0, lineHeight: 1.1
        }}>Mumbai Events</h1>
        <p style={{ color: "#6B7280", marginTop: 6, fontSize: 14 }}>Movies & Concerts — Book in seconds</p>

        {/* Filter pills */}
        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 18 }}>
          {[["all","All"],["movie","Movies"],["concert","Concerts"]].map(([v, l]) => (
            <button key={v} onClick={() => setFilter(v)} style={{
              padding: "7px 20px", borderRadius: 24, border: "1px solid", cursor: "pointer",
              borderColor: filter === v ? "#D4AF37" : "#374151",
              background:  filter === v ? "rgba(212,175,55,0.1)" : "transparent",
              color:       filter === v ? "#D4AF37" : "#6B7280",
              fontWeight:  filter === v ? 700 : 400,
              fontSize: 13, transition: "all 0.2s", fontFamily: "inherit"
            }}>{l}</button>
          ))}
        </div>
      </div>

      {/* Event cards grid */}
      <div style={{ padding: "24px 16px", maxWidth: 920, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 20 }}>
          {filtered.map(ev => (
            <div key={ev.id}
              style={{
                background: "#111827", borderRadius: 18, overflow: "hidden",
                border: "1px solid #1F2937", cursor: "pointer",
                transition: "transform 0.22s,box-shadow 0.22s"
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 24px 50px rgba(0,0,0,0.5)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)";    e.currentTarget.style.boxShadow = "none"; }}
            >
              {/* Banner */}
              <div style={{
                height: 110,
                background: `linear-gradient(135deg,${ev.accentColor} 0%,#111827 100%)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 56, position: "relative"
              }}>
                {ev.emoji}
                <div style={{
                  position: "absolute", top: 10, left: 10,
                  background: ev.type === "movie" ? "rgba(29,59,123,0.85)" : "rgba(91,29,123,0.85)",
                  color:      ev.type === "movie" ? "#93C5FD" : "#D8B4FE",
                  borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 700,
                  display: "flex", alignItems: "center", gap: 5
                }}>
                  {ev.type === "movie" ? <><Film size={11}/> MOVIE</> : <><Music size={11}/> CONCERT</>}
                </div>
                {ev.hasFlashDeal && (
                  <div style={{ position: "absolute", top: 10, right: 10 }}>
                    <FlashTimer seconds={ev.flashDuration} discount={ev.flashDiscount}/>
                  </div>
                )}
              </div>

              {/* Card body */}
              <div style={{ padding: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <h3 style={{ color: "#F9FAFB", fontSize: 16, fontWeight: 700, margin: 0, lineHeight: 1.3, flex: 1 }}>{ev.title}</h3>
                  <div style={{ color: "#FBBF24", fontSize: 12, fontWeight: 700, marginLeft: 8, display: "flex", alignItems: "center", gap: 3 }}>
                    <Star size={11} fill="#FBBF24"/> {ev.rating}
                  </div>
                </div>

                <div style={{ color: "#9CA3AF", fontSize: 12, marginBottom: 3, display: "flex", alignItems: "center", gap: 5 }}>
                  <MapPin size={11}/> {ev.venue}
                </div>
                <div style={{ color: "#9CA3AF", fontSize: 12, marginBottom: 12, display: "flex", alignItems: "center", gap: 5 }}>
                  <Calendar size={11}/> {ev.date} · {ev.time}
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 14 }}>
                  {ev.tags.slice(0, 2).map(t => (
                    <span key={t} style={{ background: "#1F2937", color: "#6B7280", borderRadius: 5, padding: "2px 8px", fontSize: 10, fontWeight: 600 }}>{t}</span>
                  ))}
                </div>

                <div style={{ borderTop: "1px solid #1F2937", paddingTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <span style={{ color: "#D4AF37", fontWeight: 800, fontSize: 16 }}>₹{ev.economyPrice}</span>
                    <span style={{ color: "#6B7280", fontSize: 11 }}> onwards</span>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => onVenue(ev)} style={{
                      padding: "7px 12px", borderRadius: 8, border: "1px solid #374151",
                      background: "transparent", color: "#9CA3AF", cursor: "pointer",
                      fontSize: 12, fontFamily: "inherit"
                    }}>
                      <MapPin size={13}/>
                    </button>
                    <button onClick={() => onSelect(ev)} style={{
                      padding: "7px 16px", borderRadius: 8, border: "none",
                      background: "linear-gradient(135deg,#D4AF37,#B8962E)",
                      color: "#0a0a0a", cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: "inherit"
                    }}>
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
