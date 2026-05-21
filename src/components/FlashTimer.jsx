import { useState, useEffect } from "react";
import { Zap } from "lucide-react";

// Counts down from `seconds` and shows a flash discount badge.
// Returns null when timer reaches zero.
export default function FlashTimer({ seconds, discount }) {
  const [rem, setRem] = useState(seconds);

  useEffect(() => {
    if (rem <= 0) return;
    const t = setInterval(() => setRem(r => r - 1), 1000);
    return () => clearInterval(t);
  }, []);

  if (rem <= 0) return null;

  const m  = String(Math.floor(rem / 60)).padStart(2, "0");
  const sc = String(rem % 60).padStart(2, "0");

  return (
    <div style={{
      background: "linear-gradient(135deg,#FF4500,#FF8C00)",
      color: "white", borderRadius: 6, padding: "3px 10px",
      fontSize: 11, fontWeight: 800,
      display: "flex", alignItems: "center", gap: 5
    }}>
      <Zap size={11} /> {discount}% OFF · {m}:{sc}
    </div>
  );
}
