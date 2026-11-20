"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/use-auth";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { loginWithGoogle } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setIsLoading(false);
    if (result?.ok) {
      router.push("/dashboard");
    } else {
      setError(result?.error || "Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#F1F4F9]">
      {/* Split layout */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 shadow-2xl rounded-3xl overflow-hidden">

        {/* Left Panel — Brand */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-[#151B30]">
          <Link href="/" className="inline-flex items-center gap-2.5 font-extrabold text-xl text-white">
            <span
              className="w-9 h-9 rounded-xl flex items-center justify-center text-[#151B30] text-base font-black shadow-sm"
              style={{ background: "#0EA5E9" }}
            >
              s
            </span>
            SkillBridge
          </Link>

          <div>
            <blockquote className="text-2xl font-bold text-white leading-snug mb-4">
              "SkillBridge helped me learn React in Afaan Oromo — and I landed a remote job in 3 months."
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0EA5E9] flex items-center justify-center text-[#151B30] font-black text-sm">AT</div>
              <div>
                <p className="font-bold text-white text-sm">Almaz Tadesse</p>
                <p className="text-[#F1F4F9] text-xs">Frontend Developer · TechEthiopia</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 text-sm font-semibold text-[#F1F4F9]">
            <span>✓ 10,000+ Learners</span>
            <span>✓ 500+ Courses</span>
            <span>✓ Free Forever</span>
          </div>
        </div>

        {/* Right Panel — Form */}
        <div className="bg-[#FFFFFF] p-8 sm:p-12 flex flex-col justify-center">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 font-extrabold text-xl text-[#151B30] mb-8 lg:hidden">
            <span className="w-8 h-8 rounded-xl flex items-center justify-center text-[#151B30] text-sm font-black" style={{ background: "#0EA5E9" }}>s</span>
            SkillBridge
          </div>

          <h1 className="text-3xl font-extrabold text-[#151B30] mb-1">Welcome back</h1>
          <p className="text-sm text-[#3B4D7A] font-medium mb-8">Sign in to continue your journey</p>

          {/* Google SSO */}
          <button
            type="button"
            onClick={loginWithGoogle}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl text-sm font-bold transition-all border border-[#3B4D7A]/30 bg-[#F1F4F9] text-[#151B30] hover:bg-[#3B4D7A]/10 cursor-pointer mb-6"
          >
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.9z"/>
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16.1 18.9 13 24 13c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
              <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.4 35.5 26.8 36 24 36c-5.3 0-9.7-3.1-11.3-7.6l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
              <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.5l6.2 5.2C41 35.4 44 30 44 24c0-1.3-.1-2.7-.4-3.9z"/>
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-[#3B4D7A]/20" />
            <span className="text-xs font-semibold text-[#3B4D7A]">or continue with email</span>
            <div className="flex-1 h-px bg-[#3B4D7A]/20" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-[#151B30] mb-1.5">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 rounded-xl border border-[#3B4D7A]/30 bg-[#F1F4F9] text-[#151B30] text-sm font-medium placeholder:text-[#3B4D7A] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent transition-all"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-bold text-[#151B30]">Password</label>
                <a href="#" className="text-xs font-bold text-[#0EA5E9] hover:underline">Forgot password?</a>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-xl border border-[#3B4D7A]/30 bg-[#F1F4F9] text-[#151B30] text-sm font-medium placeholder:text-[#3B4D7A] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent transition-all"
              />
            </div>

            {error && (
              <div className="rounded-xl px-4 py-3 text-sm font-semibold bg-[#F1F4F9] border border-[#3B4D7A]/40 text-[#151B30]">
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl font-bold text-sm transition-all active:scale-[.98] disabled:opacity-60 shadow-sm bg-[#F59E0B] text-[#151B30] hover:opacity-90 cursor-pointer border-none"
            >
              {isLoading ? "Signing in…" : "Sign In →"}
            </button>
          </form>

          <p className="text-center text-sm mt-6 text-[#3B4D7A] font-medium">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-extrabold text-[#151B30] hover:text-[#0EA5E9] transition-colors">
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
