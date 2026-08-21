import type { Game } from "../data/games";

interface GameCardProps {
  game: Game;
  onPlay: (id: string) => void;
  featured?: boolean;
}

const DIFF_DOT: Record<string, string> = {
  Easy:   "#34d399",
  Medium: "#fbbf24",
  Hard:   "#f43f8e",
};

const CAT_COLOR: Record<string, string> = {
  Arcade:     "#a78bfa",
  Puzzle:     "#22d3ee",
  Action:     "#f43f8e",
  Classic:    "#fbbf24",
  Multiplayer:"#34d399",
};

export default function GameCard({ game, onPlay, featured }: GameCardProps) {
  return (
    <div
      className="game-card flex h-full flex-col cursor-pointer rounded-xl overflow-hidden"
      onClick={() => onPlay(game.id)}
      style={{ background: "#13131f", border: "1px solid #1e1e38" }}
    >
      {/* Thumbnail */}
      <div
        className="card-thumb relative overflow-hidden flex-shrink-0"
        style={{
          height: featured ? 260 : 170,
          background: `linear-gradient(145deg, ${game.gradient})`,
        }}
      >
        {/* Subtle scanline — single pass, not repeated */}
        <div className="absolute inset-0" style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px)",
        }} />
        {/* Corner vignette only */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)"
        }} />

        {/* Category — top left, small pixel label */}
        <span
          className="absolute top-3 left-3 font-pixel text-[8px] px-2 py-1 rounded-sm"
          style={{ background: "rgba(0,0,0,0.65)", color: CAT_COLOR[game.category], backdropFilter: "blur(4px)" }}
        >
          {game.category}
        </span>

        {/* Difficulty dot — top right */}
        <span
          className="absolute top-3 right-3 w-2 h-2 rounded-full"
          style={{ background: DIFF_DOT[game.difficulty], boxShadow: `0 0 6px ${DIFF_DOT[game.difficulty]}` }}
          title={game.difficulty}
        />

        {/* Emoji — center, large */}
        <span
          className="absolute inset-0 flex items-center justify-center text-6xl animate-float"
          style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.5))" }}
        >
          {game.icon}
        </span>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <h3
            className="font-outfit font-bold text-base leading-snug mb-1"
            style={{ color: "#f0eeff" }}
          >
            {game.title}
          </h3>
          <p className="font-outfit text-xs leading-relaxed" style={{ color: "#6b688a" }}>
            {game.description.slice(0, 72)}…
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto pt-3" style={{ borderTop: "1px solid #1e1e38" }}>
          <div className="flex items-center gap-1">
            <span className="font-mono text-[10px]" style={{ color: "#34d399" }}>★</span>
            <span className="font-mono text-[10px] font-medium" style={{ color: "#6b688a" }}>
              {game.highScore.toLocaleString()}
            </span>
          </div>
          <span className="font-outfit text-[11px] font-medium" style={{ color: "#6b688a" }}>
            {(game.plays / 1000).toFixed(1)}k plays
          </span>
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); onPlay(game.id); }}
          className="btn-primary w-full py-2 rounded-lg text-sm"
        >
          Play
        </button>
      </div>
    </div>
  );
}
