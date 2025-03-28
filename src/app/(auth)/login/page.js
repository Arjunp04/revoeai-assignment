"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import LoginForm from "@/components/form/LoginForm";

const LoginPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard"); // Redirect logged-in users
    }
  }, [user, loading, router]);

  return loading ? (
    <p className="text-white text-center">Loading...</p>
  ) : user ? null : (
    <LoginForm />
  );
};

export default LoginPage;
