import { useState, useEffect, useCallback } from "react";
import { GAMES, PLAYERS, AVATAR_COLORS } from "../data/games";

type Page = "home" | "games" | "leaderboard" | "profile" | "auth" | "game";

interface GamePageProps {
  gameId: string;
  onNav: (page: Page, gameId?: string) => void;
}

const DIFF_COLOR: Record<string, string> = { Easy: "#34d399", Medium: "#fbbf24", Hard: "#f43f8e" };
const CAT_COLOR:  Record<string, string> = {
  Arcade: "#a78bfa", Puzzle: "#22d3ee", Action: "#f43f8e", Classic: "#fbbf24", Multiplayer: "#34d399",
};

export default function GamePage({ gameId, onNav }: GamePageProps) {
  const game = GAMES.find((g) => g.id === gameId) ?? GAMES[0];

  const [score,       setScore]       = useState(0);
  const [isPaused,    setIsPaused]    = useState(false);
  const [isPlaying,   setIsPlaying]   = useState(false);
  const [timeLeft,    setTimeLeft]    = useState(90);
  const [gameOver,    setGameOver]    = useState(false);
  const [newHighScore,setNewHighScore]= useState(false);

  const startGame = useCallback(() => {
    setScore(0); setTimeLeft(90); setIsPaused(false);
    setIsPlaying(true); setGameOver(false);
  }, []);

  const endGame = useCallback(() => {
    setIsPlaying(false); setGameOver(true);
    setNewHighScore(score > game.highScore * 0.5);
  }, [score, game.highScore]);

  useEffect(() => {
    if (!isPlaying || isPaused) return;
    const iv = setInterval(() => {
      setScore((s) => s + Math.floor(Math.random() * 130 + 50));
      setTimeLeft((t) => { if (t <= 1) { endGame(); return 0; } return t - 1; });
    }, 1000);
    return () => clearInterval(iv);
  }, [isPlaying, isPaused, endGame]);

  const fmt = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="min-h-screen pt-14 pb-24 md:pb-0" style={{ background: "#080812" }}>

      {/* Top bar */}
      <div
        className="sticky top-14 z-40 px-5 py-3 flex items-center justify-between"
        style={{ background: "rgba(8,8,18,0.95)", borderBottom: "1px solid #1e1e38", backdropFilter: "blur(12px)" }}
      >
        <button
          onClick={() => onNav("games")}
          className="font-outfit font-semibold text-sm transition-colors"
          style={{ color: "#6b688a" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#f0eeff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#6b688a")}
        >
          ← Games
        </button>
        <div className="flex items-center gap-2">
          <span
            className="font-pixel text-[8px] px-2.5 py-1 rounded"
            style={{ background: `${CAT_COLOR[game.category]}18`, color: CAT_COLOR[game.category] }}
          >
            {game.category}
          </span>
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: DIFF_COLOR[game.difficulty], boxShadow: `0 0 6px ${DIFF_COLOR[game.difficulty]}` }}
            title={game.difficulty}
          />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 py-8">
        <h1 className="font-outfit font-black text-2xl mb-8" style={{ color: "#f0eeff", letterSpacing: "-0.01em" }}>
          {game.title}
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Game column */}
          <div className="lg:col-span-2 space-y-0">
            {/* Score bar */}
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ background: "#13131f", border: "1px solid #1e1e38", borderRadius: "12px 12px 0 0" }}
            >
              <div className="flex gap-8">
                <div>
                  <p className="font-outfit text-xs mb-1" style={{ color: "#6b688a" }}>Score</p>
                  <p className="font-mono font-bold text-xl" style={{ color: "#a78bfa" }}>{score.toLocaleString()}</p>
                </div>
                <div>
                  <p className="font-outfit text-xs mb-1" style={{ color: "#6b688a" }}>Best</p>
                  <p className="font-mono font-bold text-xl" style={{ color: "#34d399" }}>{game.highScore.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-outfit text-xs mb-1" style={{ color: "#6b688a" }}>Time</p>
                  <p className="font-mono font-bold text-xl" style={{ color: timeLeft < 20 ? "#f43f8e" : "#fbbf24" }}>
                    {fmt(timeLeft)}
                  </p>
                </div>
                {isPlaying && (
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="btn-ghost px-3 py-1.5 rounded-lg font-outfit font-semibold text-xs border"
                    style={{ color: "#6b688a", borderColor: "#1e1e38" }}
                  >
                    {isPaused ? "Resume" : "Pause"}
                  </button>
                )}
              </div>
            </div>

            {/* Canvas */}
            <div
              className="relative flex items-center justify-center overflow-hidden"
              style={{
                background: "#0a0a18",
                border: `1px solid #1e1e38`,
                borderTop: `2px solid ${game.gradient.split(",")[0].trim().replace("linear-gradient(135deg, ", "")}`,
                borderRadius: "0 0 12px 12px",
                minHeight: 380,
              }}
            >
              {/* Dot grid */}
              <div className="absolute inset-0" style={{
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }} />

              <div className="relative z-10 text-center space-y-5 p-8">
                {!isPlaying && !gameOver && (
                  <>
                    <div className="text-7xl" style={{ filter: "drop-shadow(0 0 16px rgba(124,58,237,0.4))" }}>
                      {game.icon}
                    </div>
                    <p className="font-outfit font-medium text-sm" style={{ color: "#6b688a" }}>
                      Ready to play?
                    </p>
                    <button onClick={startGame} className="btn-primary px-10 py-3 rounded-xl font-outfit font-bold text-sm">
                      Start Game
                    </button>
                  </>
                )}

                {isPlaying && (
                  <>
                    <div
                      className="text-8xl animate-float"
                      style={{ filter: isPaused ? "grayscale(0.6)" : `drop-shadow(0 0 20px rgba(124,58,237,0.5))` }}
                    >
                      {game.icon}
                    </div>
                    {isPaused && (
                      <p className="font-outfit font-black text-xl" style={{ color: "#fbbf24" }}>Paused</p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Side panel */}
          <div className="space-y-5">
            <div className="p-5 rounded-xl" style={{ background: "#13131f", border: "1px solid #1e1e38" }}>
              <p className="font-outfit font-bold text-sm mb-3" style={{ color: "#f0eeff" }}>How to play</p>
              <p className="font-outfit text-xs leading-relaxed mb-4" style={{ color: "#6b688a" }}>{game.howToPlay}</p>
              <p className="font-outfit font-semibold text-xs mb-2" style={{ color: "#fbbf24" }}>Controls</p>
              <ul className="space-y-1.5">
                {game.controls.map((c) => (
                  <li key={c} className="font-outfit text-xs flex gap-2" style={{ color: "#6b688a" }}>
                    <span style={{ color: "#7c3aed", flexShrink: 0 }}>›</span> {c}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-xl" style={{ background: "#13131f", border: "1px solid #1e1e38" }}>
              <p className="font-outfit font-bold text-sm mb-4" style={{ color: "#f0eeff" }}>Top players</p>
              {PLAYERS.slice(0, 4).map((p, i) => (
                <div key={p.id} className="flex items-center gap-3 py-2.5" style={{ borderTop: i > 0 ? "1px solid #1e1e38" : "none" }}>
                  <span className="font-outfit font-black text-sm w-4" style={{ color: i === 0 ? "#fbbf24" : "#6b688a" }}>
                    {i + 1}
                  </span>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center font-outfit font-black text-xs flex-shrink-0"
                    style={{ background: AVATAR_COLORS[p.avatar], color: "#080812" }}>
                    {p.avatar}
                  </div>
                  <span className="flex-1 font-outfit font-semibold text-sm truncate" style={{ color: "#f0eeff" }}>
                    {p.username}
                  </span>
                  <span className="font-mono text-xs font-bold" style={{ color: "#34d399" }}>
                    {Math.floor(p.score * (0.5 + i * 0.1)).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Game over modal */}
      {gameOver && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: "rgba(8,8,18,0.85)", backdropFilter: "blur(8px)" }}
        >
          <div
            className="animate-pop-in w-full max-w-sm p-8 rounded-2xl"
            style={{
              background: "#13131f",
              border: `1px solid #1e1e38`,
              borderTop: `3px solid #7c3aed`,
              boxShadow: "0 32px 64px rgba(0,0,0,0.6)",
            }}
          >
            <p className="font-pixel text-[9px] mb-1" style={{ color: "#6b688a" }}>GAME OVER</p>
            <h2 className="font-outfit font-black text-2xl mb-6" style={{ color: "#f0eeff", letterSpacing: "-0.01em" }}>
              {game.title}
            </h2>

            <div className="p-5 rounded-xl mb-4" style={{ background: "#0e0e1c" }}>
              <p className="font-outfit text-xs mb-1" style={{ color: "#6b688a" }}>Your score</p>
              <p className="font-mono font-bold text-4xl" style={{ color: "#a78bfa" }}>{score.toLocaleString()}</p>
            </div>

            {newHighScore && (
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl mb-4"
                style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)" }}>
                <span>⭐</span>
                <span className="font-outfit font-bold text-sm" style={{ color: "#34d399" }}>New personal best!</span>
              </div>
            )}

            <div className="space-y-2">
              <button onClick={startGame} className="btn-primary w-full py-3 rounded-xl font-outfit font-bold text-sm">
                Play again
              </button>
              <button
                onClick={() => onNav("leaderboard")}
                className="btn-ghost w-full py-3 rounded-xl font-outfit font-semibold text-sm border"
                style={{ color: "#fbbf24", borderColor: "rgba(251,191,36,0.2)" }}
              >
                Leaderboard
              </button>
              <button
                onClick={() => onNav("games")}
                className="btn-ghost w-full py-3 rounded-xl font-outfit font-semibold text-sm"
                style={{ color: "#6b688a" }}
              >
                Back to games
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
