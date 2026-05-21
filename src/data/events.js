import { CreditCard, Wallet, Smartphone, Building2 } from "lucide-react";

// ── Events ────────────────────────────────────────
export const EVENTS = [
  {
    id: 1, title: "Interstellar: IMAX Re-Release", type: "movie",
    genre: "Sci-Fi / Adventure", date: "May 15, 2026", time: "7:30 PM",
    duration: "2h 49m", venue: "PVR IMAX, Phoenix Mall", city: "Mumbai",
    address: "Phoenix Palladium Mall, 462, Senapati Bapat Marg, Lower Parel, Mumbai - 400013",
    phone: "+91 22 4000 7878",
    emoji: "🌌", rating: 9.2, languages: ["English", "Hindi"],
    vipPrice: 1500, standardPrice: 800, economyPrice: 500,
    hasFlashDeal: true, flashDiscount: 25, flashDuration: 720,
    tags: ["IMAX", "Christopher Nolan", "Re-Release"],
    accentColor: "#1E3A5F",
    facilities: ["Dolby Atmos", "4K Laser", "Recliner Seats", "Food Court"]
  },
  {
    id: 2, title: "Coldplay: Music of the Spheres", type: "concert",
    genre: "Pop Rock", date: "May 18, 2026", time: "6:00 PM",
    duration: "3h 00m", venue: "DY Patil Stadium", city: "Navi Mumbai",
    address: "Dr. D.Y. Patil Sports Stadium, Sector 12, CBD Belapur, Navi Mumbai - 400614",
    phone: "+91 22 2757 6655",
    emoji: "🎵", rating: 9.7, languages: ["English"],
    vipPrice: 8500, standardPrice: 4500, economyPrice: 2000,
    hasFlashDeal: false, flashDiscount: 0, flashDuration: 0,
    tags: ["Live Concert", "International", "Stadium"],
    accentColor: "#1A3A2A",
    facilities: ["60,000 Capacity", "LED Stage", "Premium Parking", "Multiple Gates"]
  },
  {
    id: 3, title: "Dune: Part Three", type: "movie",
    genre: "Sci-Fi / Epic", date: "May 22, 2026", time: "9:00 PM",
    duration: "2h 55m", venue: "INOX Megaplex, Andheri", city: "Mumbai",
    address: "Fun Republic Mall, Opposite Andheri Sports Complex, S.V. Road, Andheri West, Mumbai - 400053",
    phone: "+91 22 6743 9900",
    emoji: "🏜️", rating: 8.8, languages: ["English", "Hindi", "Tamil"],
    vipPrice: 1200, standardPrice: 700, economyPrice: 400,
    hasFlashDeal: true, flashDiscount: 15, flashDuration: 1200,
    tags: ["4DX", "Opening Week", "Denis Villeneuve"],
    accentColor: "#3D2200",
    facilities: ["4DX Seats", "Dolby Vision", "Bar Lounge", "Valet Parking"]
  },
  {
    id: 4, title: "AR Rahman: Symphony Live", type: "concert",
    genre: "Indian Classical Fusion", date: "May 25, 2026", time: "5:30 PM",
    duration: "2h 30m", venue: "NSCI Dome, Worli", city: "Mumbai",
    address: "NSCI Dome, Lala Lajpat Rai Marg, Haji Ali, Worli, Mumbai - 400030",
    phone: "+91 22 2493 2222",
    emoji: "🎶", rating: 9.4, languages: ["Hindi", "Tamil", "English"],
    vipPrice: 5000, standardPrice: 2500, economyPrice: 1000,
    hasFlashDeal: false, flashDiscount: 0, flashDuration: 0,
    tags: ["Grammy Winner", "Live Orchestra", "All Ages"],
    accentColor: "#1A0033",
    facilities: ["Live Orchestra", "Full Stage", "Air Conditioned", "Premium Sound"]
  }
];

// ── Seat configuration ────────────────────────────
export const ROWS = ["A","B","C","D","E","F","G","H","I","J"];
export const SEATS_PER_ROW = 12;

export const ROW_TIER = {
  A:"vip", B:"vip", C:"vip",
  D:"standard", E:"standard", F:"standard", G:"standard",
  H:"economy", I:"economy", J:"economy"
};

export const PREBOOKED = new Set([
  "A3","A4","A7","B2","B8","B9","C5","C6",
  "D3","D4","D11","E2","E7","E8","F1","F9","F10",
  "G5","G6","H4","H5","H10","I3","I9","J7","J8"
]);

// ── Tier styling ──────────────────────────────────
export const TIER_INFO = {
  vip:      { color:"#C084FC", bg:"rgba(192,132,252,0.12)", border:"rgba(192,132,252,0.45)", label:"VIP" },
  standard: { color:"#60A5FA", bg:"rgba(96,165,250,0.12)",  border:"rgba(96,165,250,0.45)",  label:"Standard" },
  economy:  { color:"#34D399", bg:"rgba(52,211,153,0.12)",  border:"rgba(52,211,153,0.45)",  label:"Economy" }
};

// ── Payment methods ───────────────────────────────
export const PAYMENT_METHODS = [
  { id:"card",       label:"Credit / Debit Card", desc:"Visa, Mastercard, Amex",      icon:CreditCard  },
  { id:"upi",        label:"UPI",                 desc:"GPay, PhonePe, Paytm",         icon:Smartphone  },
  { id:"netbanking", label:"Net Banking",         desc:"All major banks",              icon:Building2   },
  { id:"wallet",     label:"Wallet",              desc:"Paytm, Amazon Pay, Mobikwik",  icon:Wallet      }
];
