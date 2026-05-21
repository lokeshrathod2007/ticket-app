// ── Canvas helper: draws a rounded rectangle path ──
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);    ctx.quadraticCurveTo(x + w, y,     x + w, y + r);
  ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);    ctx.quadraticCurveTo(x,     y + h, x,     y + h - r);
  ctx.lineTo(x, y + r);        ctx.quadraticCurveTo(x,     y,     x + r, y);
  ctx.closePath();
}

// ── Draws a pseudo-QR pattern on canvas ──
function drawQR(ctx, bookingId, qrX, qrY, qrSize) {
  const cells = 21;
  const cs = (qrSize - 10) / cells;

  // Deterministic seed from booking ID
  let s = bookingId.split("").reduce((a, c) => ((a << 5) - a + c.charCodeAt(0)) | 0, 0) >>> 0;
  const lcg = v => (Math.imul(v, 1664525) + 1013904223) >>> 0;

  const grid = Array.from({ length: cells }, () => Array(cells).fill(false));
  for (let r = 0; r < cells; r++)
    for (let c = 0; c < cells; c++) { s = lcg(s); grid[r][c] = s % 2 === 0; }

  // Finder patterns (QR corners)
  const sf = (sr, sc) => {
    for (let r = 0; r < 7; r++)
      for (let c = 0; c < 7; c++)
        grid[sr + r][sc + c] =
          r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4);
  };
  sf(0, 0); sf(0, 14); sf(14, 0);

  ctx.fillStyle = "#0a0a0a";
  for (let r = 0; r < cells; r++)
    for (let c = 0; c < cells; c++)
      if (grid[r][c])
        ctx.fillRect(qrX + 5 + c * cs, qrY + 5 + r * cs, cs - 0.5, cs - 0.5);
}

// ── Main: generates and downloads ticket as PNG ──
export const downloadTicket = (booking) => {
  const W = 620, H = 390;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = "#111827";
  ctx.fillRect(0, 0, W, H);

  // Gold gradient top bar
  const grad = ctx.createLinearGradient(0, 0, W, 0);
  grad.addColorStop(0, "#D4AF37");
  grad.addColorStop(1, "#B8962E");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, 5);

  // Header tint
  ctx.fillStyle = "#1A2535";
  ctx.fillRect(0, 5, W, 115);

  // Event emoji + title
  ctx.font = "38px serif";
  ctx.fillText(booking.event.emoji || "🎭", 22, 58);
  ctx.font = "bold 20px Arial";
  ctx.fillStyle = "#F9FAFB";
  const title = booking.event.title.length > 38
    ? booking.event.title.slice(0, 38) + "…"
    : booking.event.title;
  ctx.fillText(title, 22, 88);
  ctx.font = "13px Arial";
  ctx.fillStyle = "#9CA3AF";
  ctx.fillText(booking.event.genre + "  ·  " + booking.event.duration, 22, 110);

  // Dashed separator line
  ctx.save();
  ctx.setLineDash([6, 4]);
  ctx.strokeStyle = "#374151";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(22, 135);
  ctx.lineTo(W - 22, 135);
  ctx.stroke();
  ctx.restore();

  // Details grid (left portion)
  const fields = [
    ["DATE",       booking.event.date],
    ["TIME",       booking.event.time],
    ["VENUE",      booking.event.venue.length > 24 ? booking.event.venue.slice(0, 24) + "…" : booking.event.venue],
    ["SEATS",      booking.seats.join(", ")],
    ["BOOKING ID", booking.id],
    ["AMOUNT",     "Rs." + booking.total.toLocaleString()]
  ];
  const colW = 190;
  fields.forEach(([label, val], i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 22 + col * (colW + 16);
    const y = 165 + row * 58;
    ctx.font = "bold 9px Arial";
    ctx.fillStyle = "#6B7280";
    ctx.fillText(label, x, y);
    ctx.font = "bold 13px Arial";
    ctx.fillStyle = "#F9FAFB";
    ctx.fillText(val, x, y + 20);
  });

  // QR code white box
  const qrX = W - 165, qrY = 142, qrSize = 138;
  ctx.fillStyle = "white";
  roundRect(ctx, qrX, qrY, qrSize, qrSize, 8);
  ctx.fill();

  // Draw QR pattern
  drawQR(ctx, booking.id, qrX, qrY, qrSize);

  // QR label below
  ctx.font = "10px Arial";
  ctx.fillStyle = "#6B7280";
  ctx.textAlign = "center";
  ctx.fillText("Scan at venue entry", qrX + qrSize / 2, qrY + qrSize + 18);
  ctx.textAlign = "left";

  // Footer bar
  ctx.fillStyle = "#1F2937";
  ctx.fillRect(0, H - 42, W, 42);
  ctx.font = "bold 12px Arial";
  ctx.fillStyle = "#9CA3AF";
  ctx.fillText("TicketLux  —  Official E-Ticket", 22, H - 16);
  ctx.font = "bold 11px Arial";
  ctx.fillStyle = "#D4AF37";
  ctx.textAlign = "right";
  ctx.fillText("✓ CONFIRMED", W - 22, H - 16);
  ctx.textAlign = "left";

  // Trigger browser download
  const link = document.createElement("a");
  link.download = `TicketLux-${booking.id}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
};
