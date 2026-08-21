export type Difficulty = "Easy" | "Medium" | "Hard";
export type Category = "Arcade" | "Puzzle" | "Action" | "Classic" | "Multiplayer";

export interface Game {
  id: string;
  title: string;
  description: string;
  category: Category;
  difficulty: Difficulty;
  plays: number;
  highScore: number;
  gradient: string;
  icon: string;
  controls: string[];
  howToPlay: string;
}

export interface Player {
  id: string;
  username: string;
  avatar: string;
  score: number;
  rank: number;
  game: string;
  date: string;
  gamesPlayed: number;
  bestScore: number;
}

export const GAMES: Game[] = [
  {
    id: "pixel-racer",
    title: "Pixel Racer",
    description: "Dodge obstacles and race through neon circuits at breakneck speed. Collect power-ups and set new track records.",
    category: "Arcade",
    difficulty: "Easy",
    plays: 14230,
    highScore: 99840,
    gradient: "linear-gradient(135deg, #7B2FFF 0%, #00F5FF 100%)",
    icon: "🏎️",
    controls: ["← → Arrow keys to steer", "↑ to accelerate", "Space to boost"],
    howToPlay: "Stay on the neon track, collect coins, and avoid barriers. Your speed increases every 30 seconds — stay sharp!"
  },
  {
    id: "dungeon-blitz",
    title: "Dungeon Blitz",
    description: "Hack through endless dungeons, collect loot, and face epic bosses in this fast-paced roguelite action game.",
    category: "Action",
    difficulty: "Hard",
    plays: 8450,
    highScore: 234100,
    gradient: "linear-gradient(135deg, #FF2D78 0%, #7B2FFF 100%)",
    icon: "⚔️",
    controls: ["WASD to move", "Mouse to aim", "Left click to attack", "E to pick up items"],
    howToPlay: "Clear each room to advance to the next floor. Boss rooms appear every 5 floors. Die and start over — but you keep upgrades!"
  },
  {
    id: "mind-maze",
    title: "Mind Maze",
    description: "Navigate labyrinthine puzzles that bend reality. Each level twists logic and tests your spatial reasoning.",
    category: "Puzzle",
    difficulty: "Medium",
    plays: 12100,
    highScore: 45200,
    gradient: "linear-gradient(135deg, #00F5FF 0%, #39FF14 100%)",
    icon: "🧩",
    controls: ["Arrow keys to move", "R to reset room", "Z to undo move"],
    howToPlay: "Reach the glowing exit in each maze. Levers change the maze structure. Find the right sequence to unlock the path."
  },
  {
    id: "space-invaders-redux",
    title: "Space Invaders Redux",
    description: "A Béjaïa student remake of the legendary classic. New wave patterns, boss aliens, and local co-op mode.",
    category: "Classic",
    difficulty: "Easy",
    plays: 21800,
    highScore: 88350,
    gradient: "linear-gradient(135deg, #39FF14 0%, #00F5FF 100%)",
    icon: "👾",
    controls: ["← → to move", "Space to shoot", "P to pause"],
    howToPlay: "Destroy all alien rows before they reach the bottom. Use barriers for cover. Score combos with rapid eliminations."
  },
  {
    id: "tetris-turbo",
    title: "Tetris Turbo",
    description: "Classic block-stacking at insane speed. Unlockable skins, competitive scoring, and weekly global challenges.",
    category: "Classic",
    difficulty: "Medium",
    plays: 18650,
    highScore: 142900,
    gradient: "linear-gradient(135deg, #FFD700 0%, #FF2D78 100%)",
    icon: "🟦",
    controls: ["← → to move", "↑ to rotate", "↓ soft drop", "Space hard drop"],
    howToPlay: "Fill complete horizontal lines to clear them. Four-line clears (Tetris!) score the most. Speed increases with level."
  },
  {
    id: "snake-ultra",
    title: "Snake Ultra",
    description: "The timeless snake game, turbocharged with power-ups, portals, and multiplayer arenas for up to 4 players.",
    category: "Multiplayer",
    difficulty: "Easy",
    plays: 31200,
    highScore: 63410,
    gradient: "linear-gradient(135deg, #39FF14 0%, #7B2FFF 100%)",
    icon: "🐍",
    controls: ["WASD or Arrow keys to turn", "P to pause"],
    howToPlay: "Eat apples to grow. Avoid walls and your own tail. Power-ups spawn every 20 seconds — speed boosts, shields, shrink rays."
  },
  {
    id: "block-breaker",
    title: "Block Breaker",
    description: "Destroy neon brick formations with a plasma ball. Precision shots, chain reactions, and trick angles required.",
    category: "Action",
    difficulty: "Hard",
    plays: 6900,
    highScore: 287500,
    gradient: "linear-gradient(135deg, #FF2D78 0%, #FFD700 100%)",
    icon: "🧱",
    controls: ["Mouse to move paddle", "Click to launch ball", "Space for power-up"],
    howToPlay: "Clear all bricks to advance. Red bricks need two hits. Gold bricks drop special power-ups. Don't let the ball fall!"
  },
  {
    id: "word-rush",
    title: "Word Rush",
    description: "Race against time to form words from scrambled letters. Multiplayer word battles against other BSA players.",
    category: "Puzzle",
    difficulty: "Medium",
    plays: 9340,
    highScore: 38200,
    gradient: "linear-gradient(135deg, #00F5FF 0%, #FFD700 100%)",
    icon: "📝",
    controls: ["Type on keyboard", "Enter to submit", "Backspace to clear"],
    howToPlay: "Form as many words as possible from 7 random letters before time runs out. Longer words score exponentially more points."
  }
];

export const PLAYERS: Player[] = [
  { id: "1", username: "NebulaGoblin", avatar: "N", score: 234100, rank: 1, game: "Dungeon Blitz", date: "2026-08-18", gamesPlayed: 142, bestScore: 234100 },
  { id: "2", username: "ZigZagZebra", avatar: "Z", score: 198450, rank: 2, game: "Block Breaker", date: "2026-08-17", gamesPlayed: 98, bestScore: 198450 },
  { id: "3", username: "CinderMango", avatar: "C", score: 176230, rank: 3, game: "Tetris Turbo", date: "2026-08-16", gamesPlayed: 213, bestScore: 176230 },
  { id: "4", username: "QuantumWaffle", avatar: "Q", score: 154820, rank: 4, game: "Pixel Racer", date: "2026-08-15", gamesPlayed: 76, bestScore: 154820 },
  { id: "5", username: "MagmaMoth", avatar: "M", score: 139600, rank: 5, game: "Snake Ultra", date: "2026-08-15", gamesPlayed: 187, bestScore: 139600 },
  { id: "6", username: "GizmoGoat", avatar: "G", score: 121450, rank: 6, game: "Space Invaders Redux", date: "2026-08-14", gamesPlayed: 54, bestScore: 121450 },
  { id: "7", username: "BanjoBasilisk", avatar: "B", score: 108200, rank: 7, game: "Mind Maze", date: "2026-08-13", gamesPlayed: 321, bestScore: 108200 },
  { id: "8", username: "WaffleWisp", avatar: "W", score: 97340, rank: 8, game: "Pixel Racer", date: "2026-08-12", gamesPlayed: 89, bestScore: 97340 },
  { id: "9", username: "PlasmaPancake", avatar: "P", score: 88100, rank: 9, game: "Word Rush", date: "2026-08-11", gamesPlayed: 145, bestScore: 88100 },
  { id: "10", username: "LunarLlama", avatar: "L", score: 76580, rank: 10, game: "Dungeon Blitz", date: "2026-08-10", gamesPlayed: 67, bestScore: 76580 },
];

export const AVATAR_COLORS: Record<string, string> = {
  N: "#8b5cf6", Z: "#00f5ff", C: "#ff2d78", Q: "#39ff14",
  M: "#ffd700", G: "#8b5cf6", B: "#ff2d78", W: "#00f5ff",
  P: "#39ff14", L: "#ffd700",
};
