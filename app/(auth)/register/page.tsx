"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useAuth } from "@/lib/use-auth";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"STUDENT" | "EMPLOYER">("STUDENT");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { loginWithGoogle } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    // Register then auto sign-in
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    }).catch(() => null);

    if (res && res.ok) {
      const result = await signIn("credentials", { email, password, redirect: false });
      if (result?.ok) { router.push("/dashboard"); return; }
    }
    // Fallback: attempt sign-in directly (if user already exists)
    const result = await signIn("credentials", { email, password, redirect: false });
    setIsLoading(false);
    if (result?.ok) {
      router.push("/dashboard");
    } else {
      setError("Could not create account. Please try again.");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "0.65rem 1rem",
    borderRadius: "0.625rem",
    border: "1.5px solid hsl(var(--border))",
    background: "hsl(var(--surface))",
    color: "hsl(var(--foreground))",
    fontSize: "0.9rem",
    outline: "none",
    transition: "border-color 0.2s",
  } as React.CSSProperties;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 animated-gradient py-8">
      <div
        className="w-full max-w-md rounded-3xl p-8 sm:p-10 fade-in"
        style={{
          background: "rgba(255,255,255,.9)",
          backdropFilter: "blur(24px)",
          boxShadow: "0 8px 40px rgba(0,0,0,.12), 0 0 0 1px hsl(var(--border))",
        }}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 font-extrabold text-2xl">
            <span
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black"
              style={{ background: "linear-gradient(135deg, hsl(250 100% 65%), hsl(174 100% 45%))" }}
            >
              S
            </span>
            <span className="gradient-text">SkillBridge</span>
          </Link>
          <h1 className="mt-4 text-2xl font-bold">Create your account</h1>
          <p className="text-sm mt-1" style={{ color: "hsl(var(--muted))" }}>
            Free forever · No credit card required
          </p>
        </div>

        {/* Google button */}
        <button
          type="button"
          onClick={loginWithGoogle}
          className="w-full flex items-center justify-center gap-3 py-2.5 rounded-xl text-sm font-medium transition-all hover:bg-gray-50 active:scale-[.98]"
          style={{ border: "1.5px solid hsl(var(--border))", background: "white", cursor: "pointer" }}
        >
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.9z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16.1 18.9 13 24 13c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
            <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.4 35.5 26.8 36 24 36c-5.3 0-9.7-3.1-11.3-7.6l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
            <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.5l6.2 5.2C41 35.4 44 30 44 24c0-1.3-.1-2.7-.4-3.9z"/>
          </svg>
          Sign up with Google
        </button>

        <div className="flex items-center gap-3 my-5">
          <hr style={{ flex: 1, borderColor: "hsl(var(--border))" }} />
          <span className="text-xs" style={{ color: "hsl(var(--muted))" }}>or sign up with email</span>
          <hr style={{ flex: 1, borderColor: "hsl(var(--border))" }} />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role selector */}
          <div className="grid grid-cols-2 gap-2">
            {(["STUDENT", "EMPLOYER"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className="py-2 rounded-xl text-sm font-semibold transition-all"
                style={{
                  border: "1.5px solid",
                  borderColor: role === r ? "hsl(var(--primary))" : "hsl(var(--border))",
                  background: role === r ? "hsl(var(--primary) / .08)" : "transparent",
                  color: role === r ? "hsl(var(--primary))" : "hsl(var(--muted))",
                  cursor: "pointer",
                }}
              >
                {r === "STUDENT" ? "🎓 Student" : "💼 Employer"}
              </button>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Full Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}
              placeholder="Kenenisa Bekele" required style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "hsl(var(--primary))")}
              onBlur={(e) => (e.target.style.borderColor = "hsl(var(--border))")} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Email address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com" required style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "hsl(var(--primary))")}
              onBlur={(e) => (e.target.style.borderColor = "hsl(var(--border))")} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 8 characters" required minLength={8} style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "hsl(var(--primary))")}
              onBlur={(e) => (e.target.style.borderColor = "hsl(var(--border))")} />
          </div>

          {error && (
            <div className="rounded-xl px-4 py-3 text-sm"
              style={{ background: "hsl(0 84% 60% / .08)", color: "hsl(0 84% 50%)", border: "1px solid hsl(0 84% 60% / .2)" }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all active:scale-[.98] disabled:opacity-60"
            style={{ background: "linear-gradient(135deg, hsl(250 100% 65%), hsl(174 100% 45%))", border: "none", cursor: isLoading ? "not-allowed" : "pointer" }}
          >
            {isLoading ? "Creating account…" : "Create Account →"}
          </button>
        </form>

        <p className="text-center text-sm mt-6" style={{ color: "hsl(var(--muted))" }}>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold" style={{ color: "hsl(var(--primary))" }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}