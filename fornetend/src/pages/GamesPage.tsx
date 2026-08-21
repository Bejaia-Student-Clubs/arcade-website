import { useState, useMemo } from "react";
import { GAMES } from "../data/games";
import type { Category } from "../data/games";
import GameCard from "../components/GameCard";

type Page = "home" | "games" | "leaderboard" | "profile" | "auth" | "game";
type Filter = Category | "All";
type Sort   = "plays" | "score" | "title";

interface GamesPageProps {
  onNav: (page: Page, gameId?: string) => void;
}

const CATS: Filter[] = ["All", "Arcade", "Puzzle", "Action", "Classic", "Multiplayer"];

const CAT_COLOR: Record<string, string> = {
  All: "#6b688a", Arcade: "#a78bfa", Puzzle: "#22d3ee", Action: "#f43f8e", Classic: "#fbbf24", Multiplayer: "#34d399",
};

export default function GamesPage({ onNav }: GamesPageProps) {
  const [q, setQ]       = useState("");
  const [cat, setCat]   = useState<Filter>("All");
  const [sort, setSort] = useState<Sort>("plays");

  const list = useMemo(() => {
    let g = [...GAMES];
    if (q) {
      const lower = q.toLowerCase();
      g = g.filter((x) => x.title.toLowerCase().includes(lower) || x.category.toLowerCase().includes(lower));
    }
    if (cat !== "All") g = g.filter((x) => x.category === cat);
    g.sort((a, b) =>
      sort === "plays" ? b.plays - a.plays :
      sort === "score" ? b.highScore - a.highScore :
      a.title.localeCompare(b.title)
    );
    return g;
  }, [q, cat, sort]);

  return (
    <div className="min-h-screen pt-14 pb-24 md:pb-0" style={{ background: "#080812" }}>

      {/* Header */}
      <div
        className="px-5 py-12"
        style={{ borderBottom: "1px solid #1e1e38", background: "#0e0e1c" }}
      >
        <div className="max-w-6xl mx-auto">
          <h1
            className="font-outfit font-black text-3xl sm:text-4xl mb-1"
            style={{ color: "#f0eeff", letterSpacing: "-0.02em" }}
          >
            Game Library
          </h1>
          <p className="font-outfit text-sm" style={{ color: "#6b688a" }}>
            Choose your game. Beat the score. Take the top spot.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 py-8">

        {/* Controls row */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm" style={{ color: "#6b688a" }}>⌕</span>
            <input
              type="text"
              placeholder="Search games…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="arcade-input w-full rounded-lg pl-9 pr-4 py-2.5 text-sm font-outfit font-medium"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="arcade-input px-4 py-2.5 rounded-lg text-sm font-outfit font-medium cursor-pointer"
            style={{ minWidth: 140 }}
          >
            <option value="plays">Most played</option>
            <option value="score">High score</option>
            <option value="title">A–Z</option>
          </select>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 flex-wrap mb-8">
          {CATS.map((c) => {
            const active = cat === c;
            return (
              <button
                key={c}
                onClick={() => setCat(c)}
                className="px-4 py-1.5 rounded-full font-outfit font-semibold text-xs transition-all duration-150"
                style={{
                  background: active ? `${CAT_COLOR[c]}18` : "transparent",
                  color: active ? CAT_COLOR[c] : "#6b688a",
                  border: `1px solid ${active ? CAT_COLOR[c] + "60" : "#1e1e38"}`,
                }}
              >
                {c}
              </button>
            );
          })}
        </div>

        {/* Count */}
        <p className="font-outfit text-sm mb-6" style={{ color: "#6b688a" }}>
          {list.length} game{list.length !== 1 ? "s" : ""}
        </p>

        {/* Grid */}
        {list.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {list.map((g) => (
              <GameCard key={g.id} game={g} onPlay={(id) => onNav("game", id)} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="font-outfit font-bold text-base mb-1" style={{ color: "#f0eeff" }}>No games found</p>
            <p className="font-outfit text-sm mb-5" style={{ color: "#6b688a" }}>Try a different search or filter.</p>
            <button
              onClick={() => { setQ(""); setCat("All"); }}
              className="btn-primary px-6 py-2.5 rounded-lg text-sm"
            >
              Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
