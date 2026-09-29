"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export function useAuth() {
  const { data: session, status } = useSession();

  const login = async (email: string, password: string) => {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return result;
  };

  const loginWithGoogle = async () => {
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  const logout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return {
    user: session?.user ?? null,
    session,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
    login,
    loginWithGoogle,
    logout,
  };
}
