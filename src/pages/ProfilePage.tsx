import { GAMES, AVATAR_COLORS } from "../data/games";

const ACHIEVEMENTS = [
  { id: "first-game",    label: "First Game",    desc: "Played your first",     icon: "🎮", earned: true,  color: "#a78bfa" },
  { id: "high-score",    label: "High Score",    desc: "Set a personal best",   icon: "⭐", earned: true,  color: "#fbbf24" },
  { id: "speedrunner",   label: "Speedrunner",   desc: "Finished in record time",icon: "⚡", earned: true,  color: "#22d3ee" },
  { id: "top-10",        label: "Top 10",        desc: "Global top 10",         icon: "🏆", earned: false, color: "#f43f8e" },
  { id: "arcade-master", label: "Arcade Master", desc: "Played every game",     icon: "👑", earned: false, color: "#fbbf24" },
  { id: "streak-7",      label: "7-Day Streak",  desc: "7 days in a row",       icon: "🔥", earned: true,  color: "#f43f8e" },
];

const RECENT = [
  { game: "Dungeon Blitz", score: 28400, date: "Aug 18", result: "win"  },
  { game: "Pixel Racer",   score: 14200, date: "Aug 17", result: "loss" },
  { game: "Tetris Turbo",  score: 34200, date: "Aug 16", result: "win"  },
  { game: "Snake Ultra",   score: 19800, date: "Aug 15", result: "win"  },
  { game: "Mind Maze",     score: 8100,  date: "Aug 14", result: "loss" },
];

const HISTORY = [12000, 18400, 14200, 28400, 22100, 34200, 19800];

export default function ProfilePage() {
  const maxH = Math.max(...HISTORY);

  return (
    <div className="min-h-screen pt-14 pb-24 md:pb-0" style={{ background: "#080812" }}>

      {/* Profile banner */}
      <div
        className="relative overflow-hidden"
        style={{ background: "#0e0e1c", borderBottom: "1px solid #1e1e38" }}
      >
        {/* Accent stripe */}
        <div className="absolute top-0 inset-x-0 h-1" style={{ background: "linear-gradient(90deg, #7c3aed, #f43f8e, #22d3ee)" }} />

        <div className="max-w-4xl mx-auto px-5 py-10 flex flex-col sm:flex-row items-center sm:items-end gap-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center font-outfit font-black text-3xl"
              style={{ background: "linear-gradient(135deg, #7c3aed, #f43f8e)", color: "#fff", boxShadow: "0 0 24px rgba(124,58,237,0.4)" }}>
              Z
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2"
              style={{ background: "#34d399", borderColor: "#0e0e1c" }} />
          </div>

          <div className="text-center sm:text-left">
            <div className="flex items-center gap-3 mb-1 justify-center sm:justify-start flex-wrap">
              <h1 className="font-outfit font-black text-xl" style={{ color: "#f0eeff" }}>ZakAce</h1>
              <span className="font-pixel text-[8px] px-2 py-1 rounded" style={{ background: "rgba(196,148,58,0.1)", color: "#c4943a", border: "1px solid rgba(196,148,58,0.28)" }}>
                RANK #47
              </span>
            </div>
            <p className="font-outfit text-sm mb-4" style={{ color: "#6b688a" }}>
              Student · Université de Béjaïa · since Jan 2026
            </p>
            <div className="flex gap-6 justify-center sm:justify-start">
              {[{ l: "Games", v: "28" }, { l: "Wins", v: "16" }, { l: "Hours", v: "34" }].map((s) => (
                <div key={s.l}>
                  <div className="font-outfit font-black text-xl" style={{ color: "#f0eeff" }}>{s.v}</div>
                  <div className="font-outfit text-xs" style={{ color: "#6b688a" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-5 py-8 space-y-6">

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {[
            { label: "Total Games",  value: "28",       color: "#a78bfa", icon: "🎮" },
            { label: "Total Score",  value: "147,100",  color: "#22d3ee", icon: "💎" },
            { label: "Best Score",   value: "34,200",   color: "#34d399", icon: "⭐" },
            { label: "Games Won",    value: "16",       color: "#fbbf24", icon: "🏆" },
            { label: "Rank",         value: "#47",      color: "#f43f8e", icon: "📊" },
          ].map((s) => (
            <div key={s.label} className="p-4 rounded-xl text-center" style={{ background: "#13131f", border: "1px solid #1e1e38" }}>
              <div className="text-xl mb-2">{s.icon}</div>
              <div className="font-mono font-bold text-base" style={{ color: s.color }}>{s.value}</div>
              <div className="font-outfit text-xs mt-0.5" style={{ color: "#6b688a" }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Score history */}
          <div className="p-6 rounded-xl" style={{ background: "#13131f", border: "1px solid #1e1e38" }}>
            <p className="font-outfit font-bold text-sm mb-5" style={{ color: "#f0eeff" }}>Score History</p>
            <div className="flex items-end gap-2 h-28">
              {HISTORY.map((v, i) => {
                const last = i === HISTORY.length - 1;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                    <div
                      className="w-full rounded-t transition-all"
                      style={{
                        height: `${(v / maxH) * 100}%`,
                        background: last
                          ? "linear-gradient(180deg, #34d399, rgba(52,211,153,0.2))"
                          : "linear-gradient(180deg, #7c3aed, rgba(124,58,237,0.2))",
                      }}
                    />
                    <span className="font-pixel text-[7px]" style={{ color: "#6b688a" }}>
                      {["M","T","W","T","F","S","S"][i]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent games */}
          <div className="p-6 rounded-xl" style={{ background: "#13131f", border: "1px solid #1e1e38" }}>
            <p className="font-outfit font-bold text-sm mb-4" style={{ color: "#f0eeff" }}>Recent Games</p>
            <div className="space-y-1">
              {RECENT.map((r, i) => (
                <div key={i} className="flex items-center justify-between py-2.5"
                  style={{ borderBottom: i < RECENT.length - 1 ? "1px solid #1e1e38" : "none" }}>
                  <div className="flex items-center gap-3">
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: r.result === "win" ? "#34d399" : "#f43f8e" }}
                    />
                    <div>
                      <div className="font-outfit font-semibold text-sm" style={{ color: "#f0eeff" }}>{r.game}</div>
                      <div className="font-outfit text-xs" style={{ color: "#6b688a" }}>{r.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-bold text-sm" style={{ color: r.result === "win" ? "#34d399" : "#6b688a" }}>
                      {r.score.toLocaleString()}
                    </div>
                    <div className="font-outfit text-xs" style={{ color: r.result === "win" ? "#34d399" : "#f43f8e" }}>
                      {r.result === "win" ? "win" : "loss"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="p-6 rounded-xl" style={{ background: "#13131f", border: "1px solid #1e1e38" }}>
          <p className="font-outfit font-bold text-sm mb-5" style={{ color: "#f0eeff" }}>Achievements</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {ACHIEVEMENTS.map((a) => (
              <div
                key={a.id}
                className="flex flex-col items-center text-center p-4 rounded-xl"
                style={{
                  background: a.earned ? `${a.color}0d` : "rgba(30,30,56,0.4)",
                  border: `1px solid ${a.earned ? a.color + "30" : "#1e1e38"}`,
                  opacity: a.earned ? 1 : 0.4,
                }}
              >
                <span
                  className="text-2xl mb-2"
                  style={{ filter: a.earned ? `drop-shadow(0 0 6px ${a.color})` : "grayscale(1)" }}
                >
                  {a.icon}
                </span>
                <div className="font-outfit font-bold text-xs leading-tight mb-0.5"
                  style={{ color: a.earned ? a.color : "#6b688a" }}>
                  {a.label}
                </div>
                <div className="font-outfit text-[10px] leading-tight" style={{ color: "#6b688a" }}>
                  {a.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Favorite games */}
        <div className="p-6 rounded-xl" style={{ background: "#13131f", border: "1px solid #1e1e38" }}>
          <p className="font-outfit font-bold text-sm mb-4" style={{ color: "#f0eeff" }}>Favorite Games</p>
          <div className="grid sm:grid-cols-3 gap-4">
            {GAMES.slice(1, 4).map((g) => (
              <div key={g.id} className="flex items-center gap-3 p-4 rounded-xl" style={{ background: "#0e0e1c", border: "1px solid #1e1e38" }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: g.gradient }}>
                  {g.icon}
                </div>
                <div className="min-w-0">
                  <div className="font-outfit font-bold text-sm truncate" style={{ color: "#f0eeff" }}>{g.title}</div>
                  <div className="font-mono text-xs mt-0.5" style={{ color: "#34d399" }}>
                    {Math.floor(g.highScore * 0.3).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
