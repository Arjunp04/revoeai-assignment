"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const ProtectedDashboardLayout = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login"); // Redirect if not logged in
    }
  }, [user, loading, router]);

  // 🔹 Only return children if user exists
    return user ? <>{children}</> : (
      <p className="flex justify-center items-center  mt-40 text-white text-lg">
        Loading...
      </p>
  ) ;
};

export default ProtectedDashboardLayout;
