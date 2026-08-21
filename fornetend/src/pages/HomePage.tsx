import { GAMES, PLAYERS, AVATAR_COLORS } from "../data/games";
import GameCard from "../components/GameCard";
import logo from "@/imports/Logo-removebg-preview.png";

type Page = "home" | "games" | "leaderboard" | "profile" | "auth" | "game";

interface HomePageProps {
  onNav: (page: Page, gameId?: string) => void;
}

export default function HomePage({ onNav }: HomePageProps) {
  const featured   = GAMES[0];
  const grid       = GAMES.slice(1, 5);
  const topPlayers = PLAYERS.slice(0, 3);

  return (
    <div style={{ background: "#080812", minHeight: "100vh" }}>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingTop: 56,
        }}
      >
        {/* Grid lines */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(124,58,237,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.035) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }} />

        {/* Left purple orb */}
        <div className="absolute left-0 top-1/3 w-[500px] h-[500px] pointer-events-none" style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.10) 0%, transparent 65%)",
          filter: "blur(40px)",
          transform: "translateX(-30%)",
        }} />
        {/* Right gold orb — from the logo palette */}
        <div className="absolute right-0 top-1/4 w-[400px] h-[400px] pointer-events-none" style={{
          background: "radial-gradient(circle, rgba(196,148,58,0.08) 0%, transparent 65%)",
          filter: "blur(50px)",
          transform: "translateX(20%)",
        }} />

        <div className="max-w-6xl mx-auto px-5 w-full py-20 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — copy */}
          <div>
            {/* Headline */}
            <h1
              className="font-outfit font-black leading-none mb-2"
              style={{ fontSize: "clamp(56px,8.5vw,92px)", color: "#f0eeff", letterSpacing: "-0.025em" }}
            >
              PLAY.
            </h1>
            <h1
              className="font-outfit font-black leading-none mb-2 text-outline-purple"
              style={{ fontSize: "clamp(56px,8.5vw,92px)", letterSpacing: "-0.025em" }}
            >
              COMPETE.
            </h1>
            <h1
              className="font-outfit font-black leading-none mb-8"
              style={{ fontSize: "clamp(56px,8.5vw,92px)", color: "#a78bfa", letterSpacing: "-0.025em" }}
            >
              WIN.
            </h1>

            <p
              className="font-outfit font-medium text-base leading-relaxed mb-8 max-w-xs"
              style={{ color: "#6b688a" }}
            >
              The official arcade of Université de Béjaïa. Eight games, real leaderboards, real glory.
            </p>

            <div className="flex items-center gap-3 mb-12 flex-wrap">
              <button
                onClick={() => onNav("games")}
                className="btn-primary px-8 py-3 rounded-xl font-outfit font-bold text-sm"
              >
                Browse games
              </button>
              <button
                onClick={() => onNav("leaderboard")}
                className="btn-ghost px-7 py-3 rounded-xl font-outfit font-semibold text-sm border"
                style={{ color: "#6b688a", borderColor: "#1e1e38" }}
              >
                Leaderboard
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-10">
              {[
                { n: "8",    label: "games",   color: "#a78bfa" },
                { n: "2.4k", label: "players", color: "#34d399" },
                { n: "58k",  label: "scores",  color: "#c4943a" },
              ].map((s) => (
                <div key={s.label}>
                  <div
                    className="font-outfit font-black text-2xl"
                    style={{ color: s.color, letterSpacing: "-0.02em" }}
                  >
                    {s.n}
                  </div>
                  <div className="font-outfit text-xs font-medium mt-0.5" style={{ color: "#6b688a" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — logo + floating elements */}
          <div className="hidden lg:flex items-center justify-center relative">
            {/* Outer glow ring */}
            <div
              className="absolute rounded-full animate-pulse-glow"
              style={{
                width: 380,
                height: 380,
                background: "radial-gradient(circle, rgba(196,148,58,0.12) 0%, rgba(124,58,237,0.08) 50%, transparent 70%)",
                filter: "blur(2px)",
              }}
            />
            {/* Mid ring — gold border suggestion */}
            <div
              className="absolute rounded-full"
              style={{
                width: 320,
                height: 320,
                border: "1px solid rgba(196,148,58,0.18)",
                boxShadow: "0 0 40px rgba(196,148,58,0.08), inset 0 0 40px rgba(196,148,58,0.04)",
              }}
            />

            {/* Logo */}
            <div className="relative">
              <img
                src={logo}
                alt="Béjaïa Student Arcade"
                style={{
                  width: 260,
                  height: 260,
                  objectFit: "contain",
                  filter: "drop-shadow(0 0 30px rgba(196,148,58,0.35)) drop-shadow(0 0 60px rgba(124,58,237,0.2))",
                }}
              />

              {/* Floating game icons — placed precisely, not scattered */}
              <span
                className="absolute animate-float"
                style={{ top: -24, right: -20, fontSize: 38, filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.5))", animationDelay: "0s" }}
              >
                🕹️
              </span>
              <span
                className="absolute animate-float-alt"
                style={{ bottom: 10, left: -32, fontSize: 30, filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.5))", animationDelay: "0.8s" }}
              >
                🏆
              </span>
              <span
                className="absolute animate-float"
                style={{ top: "30%", right: -40, fontSize: 26, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.4))", animationDelay: "1.4s" }}
              >
                ⭐
              </span>

              {/* Score badge — small floating detail */}
              <div
                className="absolute animate-float-alt"
                style={{
                  bottom: -10,
                  right: -16,
                  background: "#13131f",
                  border: "1px solid #1e1e38",
                  borderRadius: 10,
                  padding: "6px 10px",
                  animationDelay: "0.4s",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                }}
              >
                <div className="font-pixel text-[7px] mb-0.5" style={{ color: "#6b688a" }}>HIGH SCORE</div>
                <div className="font-mono font-bold text-sm" style={{ color: "#34d399" }}>287,500</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
          <span className="font-pixel text-[7px]" style={{ color: "#6b688a", letterSpacing: "0.1em" }}>SCROLL</span>
          <div className="w-px h-6" style={{ background: "linear-gradient(180deg, #6b688a, transparent)" }} />
        </div>
      </section>

      {/* ── TICKER ────────────────────────────────────────────── */}
      <div className="overflow-hidden py-2.5" style={{ background: "#0e0e1c", borderTop: "1px solid #1e1e38", borderBottom: "1px solid #1e1e38" }}>
        <div className="animate-marquee whitespace-nowrap inline-flex gap-12">
          {Array(2).fill(GAMES).flat().map((g, i) => (
            <span key={i} className="inline-flex items-center gap-2.5 font-pixel text-[8px]" style={{ color: "#6b688a" }}>
              <span style={{ color: "#c4943a" }}>·</span>
              {g.title.toUpperCase()}
            </span>
          ))}
        </div>
      </div>

      {/* ── FEATURED ─────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-5 py-20">
        <div className="flex items-baseline justify-between mb-8">
          <div>
            <h2
              className="font-outfit font-black text-2xl sm:text-3xl"
              style={{ color: "#f0eeff", letterSpacing: "-0.02em" }}
            >
              Featured Games
            </h2>
            <p className="font-outfit text-sm mt-1" style={{ color: "#6b688a" }}>
              Handpicked by the BSA team
            </p>
          </div>
          <button
            onClick={() => onNav("games")}
            className="font-outfit font-semibold text-sm"
            style={{ color: "#a78bfa" }}
          >
            See all →
          </button>
        </div>

        {/* Featured layout: one larger emphasis card and a balanced secondary grid */}
        <div className="grid gap-5 lg:grid-cols-[1.15fr_1.85fr]">
          <div className="h-full">
            <GameCard game={featured} onPlay={(id) => onNav("game", id)} featured />
          </div>
          <div className="grid gap-5 sm:grid-cols-2 h-full">
            {grid.map((g) => (
              <GameCard key={g.id} game={g} onPlay={(id) => onNav("game", id)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── TOP PLAYERS ──────────────────────────────────────── */}
      <section style={{ background: "#0e0e1c", borderTop: "1px solid #1e1e38", borderBottom: "1px solid #1e1e38" }}>
        <div className="max-w-6xl mx-auto px-5 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Copy */}
            <div>
              <p className="font-pixel text-[8px] mb-4" style={{ color: "#c4943a", letterSpacing: "0.12em" }}>HALL OF FAME</p>
              <h2
                className="font-outfit font-black text-3xl sm:text-4xl mb-4"
                style={{ color: "#f0eeff", letterSpacing: "-0.02em", lineHeight: 1.1 }}
              >
                Top of the<br />
                <span style={{ color: "#a78bfa" }}>leaderboard.</span>
              </h2>
              <p className="font-outfit text-sm leading-relaxed mb-8 max-w-xs" style={{ color: "#6b688a" }}>
                These three hold the highest scores across all games. Can you beat them?
              </p>
              <button
                onClick={() => onNav("leaderboard")}
                className="btn-primary px-7 py-2.5 rounded-xl font-outfit font-bold text-sm"
              >
                Full leaderboard
              </button>
            </div>

            {/* Ranked list */}
            <div className="space-y-1">
              {topPlayers.map((p, i) => {
                const rankColors = ["#c4943a", "#94a3b8", "#7b5e42"];
                return (
                  <div
                    key={p.id}
                    className="lb-row flex items-center gap-5 px-5 py-4 rounded-xl"
                    style={{ background: i === 0 ? "rgba(196,148,58,0.05)" : "transparent" }}
                  >
                    {/* Big rank number */}
                    <span
                      className="font-outfit font-black flex-shrink-0 w-8 text-right"
                      style={{ fontSize: 32, color: rankColors[i], letterSpacing: "-0.04em", lineHeight: 1 }}
                    >
                      {i + 1}
                    </span>

                    {/* Avatar */}
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-outfit font-black text-sm flex-shrink-0"
                      style={{ background: AVATAR_COLORS[p.avatar], color: "#080812" }}
                    >
                      {p.avatar}
                    </div>

                    {/* Name + game */}
                    <div className="flex-1 min-w-0">
                      <div className="font-outfit font-bold text-sm" style={{ color: "#f0eeff" }}>{p.username}</div>
                      <div className="font-outfit text-xs" style={{ color: "#6b688a" }}>{p.game}</div>
                    </div>

                    {/* Score */}
                    <div className="text-right">
                      <div className="font-mono font-bold text-sm" style={{ color: "#34d399" }}>
                        {p.score.toLocaleString()}
                      </div>
                      <div className="font-pixel text-[7px]" style={{ color: "#6b688a" }}>PTS</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── MORE GAMES ───────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-5 py-20">
        <h2
          className="font-outfit font-black text-2xl mb-8"
          style={{ color: "#f0eeff", letterSpacing: "-0.02em" }}
        >
          More to play
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {GAMES.slice(4).map((g) => (
            <GameCard key={g.id} game={g} onPlay={(id) => onNav("game", id)} />
          ))}
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer style={{ borderTop: "1px solid #1e1e38" }}>
        <div className="max-w-6xl mx-auto px-5 py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            {/* Logo + name */}
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0"
                style={{ border: "1.5px solid rgba(196,148,58,0.4)" }}
              >
                <img src={logo} alt="BSA" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="font-outfit font-black text-sm" style={{ color: "#f0eeff" }}>
                  Béjaïa Student Arcade
                </div>
                <div className="font-outfit text-xs" style={{ color: "#6b688a" }}>
                  Université de Béjaïa · 2026
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="flex gap-6">
              {["About", "GitHub", "Contact"].map((l) => (
                <a
                  key={l}
                  href="#"
                  className="font-outfit font-medium text-sm transition-colors"
                  style={{ color: "#6b688a" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#f0eeff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#6b688a")}
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
