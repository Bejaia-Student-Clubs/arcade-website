import { useState } from "react";
import logo from "@/imports/Logo-removebg-preview.png";

type Page = "home" | "games" | "leaderboard" | "profile" | "auth" | "game";

interface NavbarProps {
  current: Page;
  onNav: (page: Page) => void;
}

const LINKS = [
  { id: "home" as Page,        label: "Home" },
  { id: "games" as Page,       label: "Games" },
  { id: "leaderboard" as Page, label: "Leaderboard" },
  { id: "profile" as Page,     label: "Profile" },
];

export default function Navbar({ current, onNav }: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 h-14"
      style={{
        background: "rgba(8,8,18,0.92)",
        borderBottom: "1px solid #1e1e38",
        backdropFilter: "blur(16px)",
      }}
    >
      <div className="max-w-6xl mx-auto px-5 h-full flex items-center justify-between">

        {/* Logo */}
        <button onClick={() => onNav("home")} className="flex items-center">
          <div
            className="w-11 h-11 rounded-full overflow-hidden shrink-0"
            style={{
              border: "1.5px solid rgba(196,148,58,0.6)",
              boxShadow: "0 0 12px rgba(196,148,58,0.3)",
            }}
          >
            <img src={logo} alt="BSA" className="w-full h-full object-cover" />
          </div>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center">
          {LINKS.map((l) => {
            const active = current === l.id;
            return (
              <button
                key={l.id}
                onClick={() => onNav(l.id)}
                className="relative px-4 py-1.5 font-outfit font-semibold text-sm transition-colors duration-150"
                style={{ color: active ? "#f0eeff" : "#6b688a" }}
              >
                {l.label}
                {active && (
                  <span
                    className="absolute bottom-0 left-4 right-4 h-px"
                    style={{ background: "#7c3aed", boxShadow: "0 0 6px #7c3aed" }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNav("auth")}
            className="btn-ghost hidden sm:block px-4 py-1.5 rounded-md font-outfit font-semibold text-sm border"
            style={{ color: "#6b688a", borderColor: "#1e1e38" }}
          >
            Log in
          </button>
          <button
            onClick={() => onNav("games")}
            className="btn-primary px-5 py-1.5 rounded-md font-outfit font-bold text-sm hidden sm:block"
          >
            Play now
          </button>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          >
            <span className="block w-5 h-px transition-all" style={{ background: "#6b688a", transform: open ? "rotate(45deg) translate(0, 5px)" : "none" }} />
            <span className="block w-5 h-px" style={{ background: "#6b688a", opacity: open ? 0 : 1, transition: "opacity 0.15s" }} />
            <span className="block w-5 h-px transition-all" style={{ background: "#6b688a", transform: open ? "rotate(-45deg) translate(0, -5px)" : "none" }} />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden py-2 px-5 space-y-0.5" style={{ background: "#0e0e1c", borderBottom: "1px solid #1e1e38" }}>
          {LINKS.map((l) => (
            <button key={l.id} onClick={() => { onNav(l.id); setOpen(false); }}
              className="w-full text-left px-3 py-2.5 rounded font-outfit font-semibold text-sm"
              style={{ color: current === l.id ? "#f0eeff" : "#6b688a", background: current === l.id ? "rgba(124,58,237,0.1)" : "transparent" }}>
              {l.label}
            </button>
          ))}
          <div className="pt-2 pb-1 flex gap-2">
            <button onClick={() => { onNav("auth"); setOpen(false); }}
              className="flex-1 py-2 rounded border font-outfit font-semibold text-sm text-center"
              style={{ color: "#6b688a", borderColor: "#1e1e38" }}>
              Log in
            </button>
            <button onClick={() => { onNav("games"); setOpen(false); }}
              className="btn-primary flex-1 py-2 rounded font-outfit font-bold text-sm">
              Play now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
