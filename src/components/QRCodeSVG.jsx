// Generates a deterministic pseudo-QR SVG from any string
export default function QRCodeSVG({ data, size = 150 }) {
  const cells = 21;
  const c = size / cells;

  let s = data.split("").reduce((a, ch) => ((a << 5) - a + ch.charCodeAt(0)) | 0, 0) >>> 0;
  const lcg = v => (Math.imul(v, 1664525) + 1013904223) >>> 0;

  const grid = Array.from({ length: cells }, () => Array(cells).fill(false));
  for (let r = 0; r < cells; r++)
    for (let cc = 0; cc < cells; cc++) { s = lcg(s); grid[r][cc] = s % 2 === 0; }

  // Finder patterns (the 3 corner squares of a real QR)
  const finder = (sr, sc) => {
    for (let r = 0; r < 7; r++)
      for (let cc = 0; cc < 7; cc++)
        grid[sr + r][sc + cc] =
          r === 0 || r === 6 || cc === 0 || cc === 6 || (r >= 2 && r <= 4 && cc >= 2 && cc <= 4);
  };
  finder(0, 0); finder(0, 14); finder(14, 0);

  // Timing patterns
  for (let i = 8; i < 13; i++) { grid[6][i] = i % 2 === 0; grid[i][6] = i % 2 === 0; }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ borderRadius: 8 }}>
      <rect width={size} height={size} fill="white" />
      {grid.flatMap((row, r) =>
        row.map((filled, cc) =>
          filled
            ? <rect key={`${r}-${cc}`} x={cc * c} y={r * c} width={c} height={c} fill="#0a0a0a" />
            : null
        )
      )}
    </svg>
  );
}
