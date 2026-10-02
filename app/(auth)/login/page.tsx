"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { fetchApi } from "@/lib/api-client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetchApi("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (response.success && response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        router.push("/dashboard");
      } else {
        setError(response.message || "Invalid credentials");
      }
    } catch (err: any) {
      setError(err.message || "Connection to PERN authentication server failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "0.65rem 1rem",
    borderRadius: "0.625rem",
    border: "1.5px solid #E5E7EB",
    background: "#FFFFFF",
    color: "#111827",
    fontSize: "0.9rem",
    outline: "none",
  } as React.CSSProperties;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-indigo-50 via-white to-emerald-50">
      <div className="w-full max-w-md rounded-3xl p-8 sm:p-10 bg-white/90 backdrop-blur-xl border border-gray-100 shadow-2xl">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 font-extrabold text-2xl">
            <span className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black bg-gradient-to-r from-indigo-600 to-emerald-500">
              E
            </span>
            <span className="text-gray-900">Edot Bridge</span>
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">Sign in to your PERN Account</h1>
          <p className="text-sm mt-1 text-gray-500">Access your courses, assessments, and job matches.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@edotbridge.com"
              required
              style={inputStyle}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={inputStyle}
            />
          </div>

          {error && (
            <div className="rounded-xl px-4 py-3 text-sm bg-red-50 text-red-600 border border-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl text-white font-semibold text-sm bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700 active:scale-[.98] transition-all disabled:opacity-60"
          >
            {isLoading ? "Authenticating with PERN API..." : "Sign In →"}
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-500">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold text-indigo-600 hover:underline">
            Register free
          </Link>
        </p>
      </div>
    </div>
  );
}