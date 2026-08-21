type Page = "home" | "games" | "leaderboard" | "profile" | "auth" | "game";

interface MobileNavProps {
  current: Page;
  onNav: (page: Page) => void;
}

const NAV = [
  { id: "home" as Page,        label: "Home",        icon: "⌂" },
  { id: "games" as Page,       label: "Games",       icon: "▶" },
  { id: "leaderboard" as Page, label: "Board",       icon: "★" },
  { id: "profile" as Page,     label: "Profile",     icon: "◉" },
];

export default function MobileNav({ current, onNav }: MobileNavProps) {
  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 md:hidden flex items-center justify-around h-16"
      style={{ background: "rgba(14,14,28,0.97)", borderTop: "1px solid #1e1e38", backdropFilter: "blur(16px)" }}
    >
      {NAV.map(({ id, icon, label }) => {
        const active = current === id;
        return (
          <button
            key={id}
            onClick={() => onNav(id)}
            className="flex flex-col items-center gap-1 flex-1 py-2"
          >
            <span
              className="text-lg leading-none"
              style={{
                color: active ? "#a78bfa" : "#6b688a",
                filter: active ? "drop-shadow(0 0 6px rgba(167,139,250,0.6))" : "none",
                fontFamily: "monospace",
              }}
            >
              {icon}
            </span>
            <span
              className="font-outfit font-semibold text-[10px]"
              style={{ color: active ? "#a78bfa" : "#6b688a" }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
