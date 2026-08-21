import { useState } from "react";
import Navbar from "./components/Navbar";
import MobileNav from "./components/MobileNav";
import HomePage from "./pages/HomePage";
import GamesPage from "./pages/GamesPage";
import GamePage from "./pages/GamePage";
import LeaderboardPage from "./pages/LeaderboardPage";
import ProfilePage from "./pages/ProfilePage";
import AuthPage from "./pages/AuthPage";

type Page = "home" | "games" | "leaderboard" | "profile" | "auth" | "game";

export default function App() {
  const [page, setPage]           = useState<Page>("home");
  const [activeGameId, setGameId] = useState("pixel-racer");

  const navigate = (target: Page, gameId?: string) => {
    if (target === "game" && gameId) setGameId(gameId);
    setPage(target);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showChrome = page !== "auth";

  return (
    <div style={{ background: "#080812", minHeight: "100vh" }}>
      {showChrome && <Navbar current={page} onNav={navigate} />}
      {showChrome && <MobileNav current={page} onNav={navigate} />}

      {page === "home"        && <HomePage onNav={navigate} />}
      {page === "games"       && <GamesPage onNav={navigate} />}
      {page === "game"        && <GamePage gameId={activeGameId} onNav={navigate} />}
      {page === "leaderboard" && <LeaderboardPage />}
      {page === "profile"     && <ProfilePage />}
      {page === "auth"        && <AuthPage onNav={navigate} />}
    </div>
  );
}
