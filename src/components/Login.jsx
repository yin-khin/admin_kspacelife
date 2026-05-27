

import { useState, useEffect } from "react";
import { authAPI } from "../api/api";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  LogIn,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import Logo from "../logo.png";

export default function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [focused, setFocused] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("rememberedEmail");
    if (saved) {
      setEmail(saved);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await authAPI.login({ email, password });
      localStorage.setItem("adminToken", res.data.token);
      rememberMe
        ? localStorage.setItem("rememberedEmail", email)
        : localStorage.removeItem("rememberedEmail");
      setToken(res.data.token);
    } catch (err) {
      setError(err.response?.data?.message || "Email ឬ Password មិនត្រឹមត្រូវ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden font-khmer"
      style={{
        background:
          "linear-gradient(135deg,#060f1e 0%,#0b2545 50%,#081c37 100%)",
      }}
    >
      {/* ── Background orbs ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle,#3b82f6,transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle,#06b6d4,transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* ── Logo ── */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <div className="w-20 h-20 rounded-2xl overflow-hidden ring-2 ring-white/20 shadow-2xl mx-auto">
              <img
                src={Logo}
                className="w-full h-full object-cover"
                alt="KSP"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-400 rounded-full border-2 border-[#0b2545] flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            KSpace Life
          </h1>
          <p className="text-blue-300/70 text-sm mt-1 tracking-wide">
            Admin Control Panel
          </p>
        </div>

        {/* ── Card ── */}
        <div
          className="rounded-3xl p-8 border"
          style={{
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(24px)",
            borderColor: "rgba(255,255,255,0.1)",
            boxShadow:
              "0 40px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-blue-300/60 mb-2">
                Email Address
              </label>
              <div
                className={`relative flex items-center rounded-2xl border transition-all duration-200
                ${focused === "email" ? "border-blue-500 shadow-[0_0_0_3px_rgba(59,130,246,0.2)]" : "border-white/10"}
              `}
                style={{ background: "rgba(255,255,255,0.06)" }}
              >
                <Mail
                  className={`absolute left-4 w-4 h-4 transition-colors ${focused === "email" ? "text-blue-400" : "text-white/30"}`}
                />
                <input
                  type="email"
                  value={email}
                  required
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused("")}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 bg-transparent text-white placeholder-white/25 text-sm outline-none rounded-2xl"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-blue-300/60 mb-2">
                Password
              </label>
              <div
                className={`relative flex items-center rounded-2xl border transition-all duration-200
                ${focused === "pass" ? "border-blue-500 shadow-[0_0_0_3px_rgba(59,130,246,0.2)]" : "border-white/10"}
              `}
                style={{ background: "rgba(255,255,255,0.06)" }}
              >
                <Lock
                  className={`absolute left-4 w-4 h-4 transition-colors ${focused === "pass" ? "text-blue-400" : "text-white/30"}`}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  required
                  onFocus={() => setFocused("pass")}
                  onBlur={() => setFocused("")}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-4 bg-transparent text-white placeholder-white/25 text-sm outline-none rounded-2xl"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-white/30 hover:text-white/70 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-all
                  ${rememberMe ? "bg-blue-500 border-blue-500" : "border-white/20 bg-white/5"}`}
                  onClick={() => setRememberMe(!rememberMe)}
                >
                  {rememberMe && (
                    <svg
                      className="w-2.5 h-2.5 text-white"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M2 6l3 3 5-5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-white/50 group-hover:text-white/70 transition-colors">
                  ចងចាំខ្ញុំ
                </span>
              </label>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-sm text-blue-400/70 hover:text-blue-300 transition-colors"
              >
                ភ្លេចពាក្យសម្ងាត់?
              </a>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2.5 bg-red-500/10 border border-red-500/20 rounded-2xl px-4 py-3">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="relative w-full py-4 rounded-2xl text-white font-bold text-sm overflow-hidden
                transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60"
              style={{
                background: "linear-gradient(135deg,#2563eb,#3b82f6)",
                boxShadow: "0 8px 32px rgba(59,130,246,0.4)",
              }}
            >
              {/* Shimmer */}
              <span
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity"
                style={{
                  background:
                    "linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)",
                }}
              />

              <span className="flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    កំពុងចូលប្រព័ន្ធ...
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    ចូលប្រព័ន្ធ
                  </>
                )}
              </span>
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-white/20 mt-6 tracking-wide">
          © 2026 KSpace Life • All rights reserved
        </p>
      </div>
    </div>
  );
}
