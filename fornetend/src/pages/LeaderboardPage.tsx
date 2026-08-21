import { useState } from "react";
import { PLAYERS, AVATAR_COLORS, GAMES } from "../data/games";

type Tab = "global" | "weekly" | "monthly" | "per-game";

const TABS: { id: Tab; label: string }[] = [
  { id: "global",   label: "Global"   },
  { id: "weekly",   label: "Weekly"   },
  { id: "monthly",  label: "Monthly"  },
  { id: "per-game", label: "Per Game" },
];

const RANK_COLORS = ["#c4943a", "#94a3b8", "#a8714a"];

export default function LeaderboardPage() {
  const [tab, setTab]   = useState<Tab>("global");
  const [game, setGame] = useState(GAMES[0].id);

  const multiplier = tab === "weekly" ? 0.32 : tab === "monthly" ? 0.65 : 1;
  const players = PLAYERS
    .map((p) => ({ ...p, score: Math.floor(p.score * multiplier) }))
    .sort((a, b) => b.score - a.score)
    .map((p, i) => ({ ...p, rank: i + 1 }));

  const top3 = players.slice(0, 3);
  const rest  = players.slice(3);
  const your  = { rank: 47, score: 34200, games: 28, best: 34200 };

  return (
    <div className="min-h-screen pt-14 pb-24 md:pb-0" style={{ background: "#080812" }}>

      {/* Header */}
      <div className="px-5 py-12" style={{ borderBottom: "1px solid #1e1e38", background: "#0e0e1c" }}>
        <div className="max-w-4xl mx-auto">
          <h1 className="font-outfit font-black text-3xl sm:text-4xl mb-1" style={{ color: "#f0eeff", letterSpacing: "-0.02em" }}>
            Leaderboard
          </h1>
          <p className="font-outfit text-sm" style={{ color: "#6b688a" }}>Who rules the arcade?</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-5 py-10">

        {/* Tabs */}
        <div className="flex gap-1 mb-10 p-1 rounded-lg" style={{ background: "#0e0e1c", border: "1px solid #1e1e38" }}>
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="flex-1 py-2 rounded-md font-outfit font-semibold text-sm transition-all duration-150"
              style={{
                background: tab === t.id ? "#13131f" : "transparent",
                color: tab === t.id ? "#f0eeff" : "#6b688a",
                boxShadow: tab === t.id ? "0 1px 4px rgba(0,0,0,0.3)" : "none",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "per-game" && (
          <div className="mb-8">
            <select
              value={game}
              onChange={(e) => setGame(e.target.value)}
              className="arcade-input px-4 py-2.5 rounded-lg text-sm font-outfit font-medium w-full sm:w-64"
            >
              {GAMES.map((g) => <option key={g.id} value={g.id}>{g.icon} {g.title}</option>)}
            </select>
          </div>
        )}

        {/* PODIUM — three distinct heights, no cards */}
        <div className="flex items-end justify-center gap-3 sm:gap-6 mb-12">
          {/* 2nd */}
          <div className="flex flex-col items-center" style={{ order: 0 }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center font-outfit font-black text-base mb-2"
              style={{ background: AVATAR_COLORS[top3[1].avatar], color: "#080812", boxShadow: `0 0 20px ${AVATAR_COLORS[top3[1].avatar]}50` }}>
              {top3[1].avatar}
            </div>
            <div className="font-outfit font-bold text-xs mb-0.5" style={{ color: "#f0eeff" }}>{top3[1].username}</div>
            <div className="font-mono text-xs mb-3" style={{ color: "#94a3b8" }}>{top3[1].score.toLocaleString()}</div>
            <div className="w-20 sm:w-24 flex items-center justify-center rounded-t-lg"
              style={{ background: "rgba(148,163,184,0.08)", border: "1px solid rgba(148,163,184,0.2)", borderBottom: "none", height: 72 }}>
              <span className="font-outfit font-black text-2xl" style={{ color: "#94a3b8" }}>2</span>
            </div>
          </div>

          {/* 1st */}
          <div className="flex flex-col items-center" style={{ order: 1 }}>
            <span className="text-xl mb-1">👑</span>
            <div className="w-16 h-16 rounded-full flex items-center justify-center font-outfit font-black text-xl mb-2"
              style={{ background: AVATAR_COLORS[top3[0].avatar], color: "#080812", boxShadow: `0 0 30px ${AVATAR_COLORS[top3[0].avatar]}70` }}>
              {top3[0].avatar}
            </div>
            <div className="font-outfit font-bold text-sm mb-0.5" style={{ color: "#f0eeff" }}>{top3[0].username}</div>
            <div className="font-mono font-bold text-sm mb-3" style={{ color: "#c4943a" }}>{top3[0].score.toLocaleString()}</div>
            <div className="w-20 sm:w-24 flex items-center justify-center rounded-t-lg"
              style={{ background: "rgba(196,148,58,0.1)", border: "1px solid rgba(196,148,58,0.3)", borderBottom: "none", height: 110, boxShadow: "0 0 24px rgba(196,148,58,0.12)" }}>
              <span className="font-outfit font-black text-3xl" style={{ color: "#c4943a" }}>1</span>
            </div>
          </div>

          {/* 3rd */}
          <div className="flex flex-col items-center" style={{ order: 2 }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center font-outfit font-black text-base mb-2"
              style={{ background: AVATAR_COLORS[top3[2].avatar], color: "#080812", boxShadow: `0 0 20px ${AVATAR_COLORS[top3[2].avatar]}50` }}>
              {top3[2].avatar}
            </div>
            <div className="font-outfit font-bold text-xs mb-0.5" style={{ color: "#f0eeff" }}>{top3[2].username}</div>
            <div className="font-mono text-xs mb-3" style={{ color: "#a8714a" }}>{top3[2].score.toLocaleString()}</div>
            <div className="w-20 sm:w-24 flex items-center justify-center rounded-t-lg"
              style={{ background: "rgba(168,113,74,0.08)", border: "1px solid rgba(168,113,74,0.2)", borderBottom: "none", height: 52 }}>
              <span className="font-outfit font-black text-2xl" style={{ color: "#a8714a" }}>3</span>
            </div>
          </div>
        </div>
        {/* Podium base */}
        <div className="h-2 rounded-b-xl mb-10" style={{ background: "#13131f", border: "1px solid #1e1e38", borderTop: "none" }} />

        {/* Table */}
        <div className="rounded-xl overflow-hidden mb-8" style={{ border: "1px solid #1e1e38" }}>
          <div className="grid grid-cols-[36px_1fr_auto_auto_auto] gap-4 px-5 py-3 font-outfit font-semibold text-xs"
            style={{ background: "#0e0e1c", color: "#6b688a", borderBottom: "1px solid #1e1e38" }}>
            <span>#</span>
            <span>Player</span>
            <span className="hidden sm:block">Game</span>
            <span>Date</span>
            <span className="text-right">Score</span>
          </div>
          {rest.map((p, i) => (
            <div key={p.id}
              className="lb-row grid grid-cols-[36px_1fr_auto_auto_auto] gap-4 px-5 py-3.5 items-center"
              style={{ borderBottom: i < rest.length - 1 ? "1px solid rgba(30,30,56,0.7)" : "none" }}>
              <span className="font-outfit font-bold text-sm" style={{ color: "#6b688a" }}>{p.rank}</span>
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center font-outfit font-black text-xs"
                  style={{ background: AVATAR_COLORS[p.avatar], color: "#080812" }}>
                  {p.avatar}
                </div>
                <span className="font-outfit font-semibold text-sm truncate" style={{ color: "#f0eeff" }}>{p.username}</span>
              </div>
              <span className="hidden sm:block font-outfit text-xs truncate" style={{ color: "#6b688a" }}>{p.game}</span>
              <span className="font-mono text-xs" style={{ color: "#6b688a" }}>{p.date.slice(5)}</span>
              <span className="font-mono font-bold text-sm text-right" style={{ color: "#34d399" }}>{p.score.toLocaleString()}</span>
            </div>
          ))}
        </div>

        {/* Your rank */}
        <div className="rounded-xl p-6" style={{ background: "#13131f", border: "1px solid rgba(124,58,237,0.25)" }}>
          <p className="font-outfit font-semibold text-xs mb-4" style={{ color: "#a78bfa" }}>⚡ Your rank</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {[
              { label: "Position",    value: `#${your.rank}`,           color: "#a78bfa" },
              { label: "Total score", value: your.score.toLocaleString(), color: "#22d3ee" },
              { label: "Games",       value: String(your.games),         color: "#c4943a" },
              { label: "Best score",  value: your.best.toLocaleString(),  color: "#34d399" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-outfit text-xs mb-1" style={{ color: "#6b688a" }}>{s.label}</div>
                <div className="font-mono font-bold text-lg" style={{ color: s.color }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
