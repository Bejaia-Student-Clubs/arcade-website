import { useState } from "react";
import logo from "@/imports/Logo-removebg-preview.png";

type Mode = "login" | "register";
type Page = "home" | "games" | "leaderboard" | "profile" | "auth" | "game";

interface AuthPageProps {
  onNav: (page: Page) => void;
}

export default function AuthPage({ onNav }: AuthPageProps) {
  const [mode, setMode] = useState<Mode>("login");
  const [form, setForm] = useState({ username: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const set = (f: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [f]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "register" && form.password !== form.confirm) {
      setError("Passwords do not match."); return;
    }
    setError(""); setLoading(true);
    setTimeout(() => { setLoading(false); onNav("home"); }, 1200);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-5 py-16 relative overflow-hidden"
      style={{ background: "#080812" }}
    >
      {/* Grid */}
      <div className="absolute inset-0" style={{
        backgroundImage: "linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
      }} />
      {/* Glow */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(124,58,237,0.07) 0%, transparent 70%)"
      }} />

      {/* Card */}
      <div
        className="relative w-full max-w-sm p-8 rounded-2xl"
        style={{
          background: "#13131f",
          border: "1px solid #1e1e38",
          borderTop: "2px solid #7c3aed",
          boxShadow: "0 32px 64px rgba(0,0,0,0.5)",
        }}
      >
        {/* Logo */}
        <div className="text-center mb-7">
          <div className="flex items-center justify-center mb-4">
            <div
              className="w-16 h-16 rounded-full overflow-hidden"
              style={{
                border: "2px solid rgba(196,148,58,0.5)",
                boxShadow: "0 0 24px rgba(196,148,58,0.2), 0 0 48px rgba(124,58,237,0.12)",
              }}
            >
              <img src={logo} alt="BSA" className="w-full h-full object-cover" />
            </div>
          </div>
          <h1 className="font-outfit font-black text-lg" style={{ color: "#f0eeff" }}>Béjaïa Student Arcade</h1>
          <p className="font-outfit text-sm mt-1" style={{ color: "#6b688a" }}>
            {mode === "login" ? "Welcome back" : "Create your account"}
          </p>
        </div>

        {/* Toggle */}
        <div className="flex mb-6 p-1 rounded-xl" style={{ background: "#0e0e1c" }}>
          {(["login", "register"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(""); }}
              className="flex-1 py-2 rounded-lg font-outfit font-semibold text-sm transition-all duration-150"
              style={{
                background: mode === m ? "#1e1e38" : "transparent",
                color: mode === m ? "#f0eeff" : "#6b688a",
              }}
            >
              {m === "login" ? "Log in" : "Register"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div>
              <label className="block font-outfit font-semibold text-xs mb-1.5" style={{ color: "#6b688a" }}>Username</label>
              <input type="text" placeholder="YourGamertag" value={form.username}
                onChange={set("username")} required className="arcade-input w-full px-4 py-2.5 rounded-xl text-sm" />
            </div>
          )}
          <div>
            <label className="block font-outfit font-semibold text-xs mb-1.5" style={{ color: "#6b688a" }}>
              {mode === "login" ? "Username or email" : "Email"}
            </label>
            <input
              type={mode === "register" ? "email" : "text"}
              placeholder={mode === "register" ? "you@univ-bejaia.dz" : "Username or email"}
              value={form.email} onChange={set("email")} required
              className="arcade-input w-full px-4 py-2.5 rounded-xl text-sm"
            />
          </div>
          <div>
            <label className="block font-outfit font-semibold text-xs mb-1.5" style={{ color: "#6b688a" }}>Password</label>
            <input type="password" placeholder="••••••••" value={form.password}
              onChange={set("password")} required className="arcade-input w-full px-4 py-2.5 rounded-xl text-sm" />
          </div>
          {mode === "register" && (
            <div>
              <label className="block font-outfit font-semibold text-xs mb-1.5" style={{ color: "#6b688a" }}>Confirm password</label>
              <input type="password" placeholder="••••••••" value={form.confirm}
                onChange={set("confirm")} required className="arcade-input w-full px-4 py-2.5 rounded-xl text-sm" />
            </div>
          )}

          {error && (
            <div className="px-4 py-2.5 rounded-xl font-outfit text-sm"
              style={{ background: "rgba(244,63,142,0.08)", border: "1px solid rgba(244,63,142,0.25)", color: "#f43f8e" }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3 rounded-xl font-outfit font-bold text-sm mt-1"
            style={{ opacity: loading ? 0.65 : 1, cursor: loading ? "not-allowed" : "pointer" }}
          >
            {loading ? "Signing in…" : mode === "login" ? "Log in" : "Create account"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px" style={{ background: "#1e1e38" }} />
          <span className="font-outfit text-xs" style={{ color: "#6b688a" }}>or</span>
          <div className="flex-1 h-px" style={{ background: "#1e1e38" }} />
        </div>

        <button
          className="btn-ghost w-full py-3 rounded-xl font-outfit font-semibold text-sm flex items-center justify-center gap-3 border"
          style={{ color: "#f0eeff", borderColor: "#1e1e38" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <p className="text-center font-outfit text-xs mt-5" style={{ color: "#6b688a" }}>
          {mode === "login" ? "No account? " : "Already registered? "}
          <button
            onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}
            className="font-semibold"
            style={{ color: "#a78bfa" }}
          >
            {mode === "login" ? "Register" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
}
