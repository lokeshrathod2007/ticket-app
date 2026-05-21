import { Calendar, Clock, MapPin, Navigation, Phone, X } from "lucide-react";

export default function VenueModal({ event, onClose }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)",
      zIndex: 200, display: "flex", alignItems: "center",
      justifyContent: "center", padding: 20
    }}>
      <div style={{
        background: "#111827", borderRadius: 20, border: "1px solid #1F2937",
        width: "100%", maxWidth: 480, overflow: "hidden"
      }}>
        {/* SVG Street Map */}
        <div style={{ position: "relative" }}>
          <svg viewBox="0 0 480 180" width="100%" style={{ display: "block" }}>
            <rect width="480" height="180" fill="#1C2333"/>
            {[30,90,150].map(y => <rect key={y} x={0} y={y} width={480} height={14} fill="#222D3F"/>)}
            {[60,160,260,360,440].map(x => <rect key={x} x={x} y={0} width={14} height={180} fill="#222D3F"/>)}
            {[[74,44,80,40,"#1A2535"],[74,108,80,38,"#1A2535"],[164,44,90,40,"#1A2535"],
              [164,108,90,38,"#1A2535"],[274,44,80,40,"#172230"],[274,108,80,38,"#1A2535"],
              [374,44,60,40,"#1A2535"],[374,108,60,38,"#172230"]
            ].map(([x,y,w,h,c],i) => <rect key={i} x={x} y={y} width={w} height={h} fill={c} rx={2}/>)}
            <rect x={164} y={44} width={40} height={40} fill="#0D3B22" rx={2}/>
            <rect x={174} y={50} width={20} height={20} fill="#0F4F2A" rx={2}/>
            <circle cx={245} cy={90} r={20} fill="#D4AF37" opacity={0.2}/>
            <circle cx={245} cy={90} r={12} fill="#D4AF37"/>
            <text x={245} y={95} textAnchor="middle" fill="#0a0a0a" fontSize={14} fontWeight="bold">★</text>
            <text x={245} y={115} textAnchor="middle" fill="#D4AF37" fontSize={9} fontWeight="bold">YOU ARE HERE</text>
          </svg>
          <button onClick={onClose} style={{
            position: "absolute", top: 12, right: 12,
            background: "rgba(0,0,0,0.6)", border: "none", borderRadius: "50%",
            width: 32, height: 32, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", color: "white"
          }}>
            <X size={16}/>
          </button>
        </div>

        <div style={{ padding: 20 }}>
          <div style={{ fontSize: 20, marginBottom: 4 }}>{event.emoji}</div>
          <h3 style={{ color: "#F9FAFB", fontSize: 18, fontWeight: 700, margin: "0 0 4px" }}>{event.title}</h3>
          <p style={{ color: "#6B7280", fontSize: 13, margin: "0 0 16px" }}>{event.genre} · {event.duration}</p>

          {/* Info grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            {[
              [Calendar, "Date",    event.date],
              [Clock,    "Time",    event.time],
              [MapPin,   "Venue",   event.venue],
              [Phone,    "Contact", event.phone]
            ].map(([Icon, label, val]) => (
              <div key={label} style={{ background: "#1F2937", borderRadius: 10, padding: "10px 12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                  <Icon size={13} color="#D4AF37"/>
                  <span style={{ color: "#6B7280", fontSize: 11, fontWeight: 600, letterSpacing: 1 }}>
                    {label.toUpperCase()}
                  </span>
                </div>
                <div style={{ color: "#F9FAFB", fontSize: 13, fontWeight: 600 }}>{val}</div>
              </div>
            ))}
          </div>

          {/* Address */}
          <div style={{ background: "#1F2937", borderRadius: 10, padding: 12, marginBottom: 16 }}>
            <div style={{ color: "#6B7280", fontSize: 11, fontWeight: 600, letterSpacing: 1, marginBottom: 6 }}>ADDRESS</div>
            <div style={{ color: "#F9FAFB", fontSize: 13, lineHeight: 1.5 }}>{event.address}</div>
          </div>

          {/* Facilities */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ color: "#6B7280", fontSize: 11, fontWeight: 600, letterSpacing: 1, marginBottom: 8 }}>FACILITIES</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {event.facilities.map(f => (
                <span key={f} style={{
                  background: "#1F2937", color: "#D4AF37",
                  borderRadius: 6, padding: "4px 10px", fontSize: 12, fontWeight: 600
                }}>{f}</span>
              ))}
            </div>
          </div>

          {/* Directions button */}
          <a
            href={`https://maps.google.com?q=${encodeURIComponent(event.address)}`}
            target="_blank" rel="noopener noreferrer"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              width: "100%", padding: "12px 0",
              background: "linear-gradient(135deg,#D4AF37,#B8962E)",
              color: "#0a0a0a", borderRadius: 12, fontWeight: 800, fontSize: 14, textDecoration: "none"
            }}
          >
            <Navigation size={16}/> Get Directions
          </a>
        </div>
      </div>
    </div>
  );
}
