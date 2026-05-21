import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { PAYMENT_METHODS } from "../data/events";

export default function PaymentView({ event, seats, total, onPay, onBack }) {
  const [method,     setMethod]     = useState(null);
  const [card,       setCard]       = useState("");
  const [processing, setProcessing] = useState(false);

  const pay = () => {
    if (!method) return;
    setProcessing(true);
    setTimeout(() => { setProcessing(false); onPay(method); }, 2200);
  };

  return (
    <div style={{ padding: "20px 16px", maxWidth: 460, margin: "0 auto" }}>
      <button onClick={onBack} style={{
        background: "none", border: "none", color: "#9CA3AF", cursor: "pointer",
        display: "flex", alignItems: "center", gap: 6, fontSize: 13, marginBottom: 18, padding: 0, fontFamily: "inherit"
      }}>
        <ChevronLeft size={16}/> Back
      </button>
      <h2 style={{ fontFamily: "Cormorant Garamond,serif", color: "#F9FAFB", fontSize: 28, margin: "0 0 20px" }}>Payment</h2>

      {/* Order summary */}
      <div style={{ background: "#111827", border: "1px solid #1F2937", borderRadius: 14, padding: 16, marginBottom: 20 }}>
        <div style={{ color: "#6B7280", fontSize: 10, letterSpacing: 1.5, fontWeight: 700, marginBottom: 10 }}>ORDER SUMMARY</div>
        <div style={{ color: "#F9FAFB", fontWeight: 700, marginBottom: 4 }}>{event.title}</div>
        <div style={{ color: "#9CA3AF", fontSize: 13, marginBottom: 2 }}>{event.date} · {event.time}</div>
        <div style={{ color: "#9CA3AF", fontSize: 13, marginBottom: 14 }}>Seats: {seats.join(", ")}</div>
        <div style={{ borderTop: "1px solid #1F2937", paddingTop: 12, display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "#9CA3AF", fontSize: 14 }}>Total</span>
          <span style={{ color: "#D4AF37", fontWeight: 800, fontSize: 20 }}>₹{total.toLocaleString()}</span>
        </div>
      </div>

      {/* Payment method list */}
      <div style={{ color: "#6B7280", fontSize: 10, letterSpacing: 1.5, fontWeight: 700, marginBottom: 10 }}>
        SELECT PAYMENT METHOD
      </div>
      {PAYMENT_METHODS.map(pm => {
        const Icon = pm.icon;
        return (
          <div key={pm.id} onClick={() => setMethod(pm.id)} style={{
            display: "flex", alignItems: "center", gap: 14,
            background:  method === pm.id ? "#1F2937" : "#111827",
            border: "1px solid", borderColor: method === pm.id ? "#D4AF37" : "#1F2937",
            borderRadius: 12, padding: "14px 16px", marginBottom: 10,
            cursor: "pointer", transition: "all 0.18s"
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10, background: "#1F2937",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: method === pm.id ? "#D4AF37" : "#6B7280"
            }}>
              <Icon size={18}/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: "#F9FAFB", fontWeight: 600, fontSize: 14 }}>{pm.label}</div>
              <div style={{ color: "#6B7280", fontSize: 12 }}>{pm.desc}</div>
            </div>
            <div style={{
              width: 18, height: 18, borderRadius: "50%",
              border: `2px solid ${method === pm.id ? "#D4AF37" : "#374151"}`,
              background: method === pm.id ? "#D4AF37" : "transparent",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              {method === pm.id && <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#0a0a0a" }}/>}
            </div>
          </div>
        );
      })}

      {/* Card details form */}
      {method === "card" && (
        <div style={{ background: "#111827", border: "1px solid #1F2937", borderRadius: 12, padding: 14, marginTop: -4, marginBottom: 4 }}>
          <input
            type="text" placeholder="Card Number" maxLength={19}
            value={card}
            onChange={e => setCard(e.target.value.replace(/\D/g,"").replace(/(.{4})/g,"$1 ").trim())}
            style={{
              width: "100%", background: "#1F2937", border: "1px solid #374151",
              borderRadius: 8, padding: "10px 12px", color: "#F9FAFB", fontSize: 14,
              marginBottom: 8, boxSizing: "border-box", fontFamily: "monospace", outline: "none"
            }}
          />
          <div style={{ display: "flex", gap: 8 }}>
            <input placeholder="MM/YY" maxLength={5} style={{ flex: 1, background: "#1F2937", border: "1px solid #374151", borderRadius: 8, padding: "10px 12px", color: "#F9FAFB", fontSize: 14, outline: "none" }}/>
            <input placeholder="CVV"   maxLength={3} style={{ flex: 1, background: "#1F2937", border: "1px solid #374151", borderRadius: 8, padding: "10px 12px", color: "#F9FAFB", fontSize: 14, outline: "none" }}/>
          </div>
        </div>
      )}

      {/* Pay button */}
      <button onClick={pay} disabled={!method || processing} style={{
        width: "100%", padding: "15px 0", marginTop: 16,
        background: method ? "linear-gradient(135deg,#D4AF37,#B8962E)" : "#1F2937",
        color:      method ? "#0a0a0a" : "#6B7280",
        border: "none", borderRadius: 12, fontWeight: 800, fontSize: 16,
        cursor: method ? "pointer" : "not-allowed", transition: "all 0.2s", fontFamily: "inherit"
      }}>
        {processing ? "⏳ Processing Payment..." : `Pay ₹${total.toLocaleString()}`}
      </button>
    </div>
  );
}
