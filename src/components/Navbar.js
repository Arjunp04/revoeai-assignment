"use client";

import { useAuth } from "@/context/AuthContext";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  // 🔹 Function to get the first two initials safely
  const getInitials = (name = "") => {
    const words = name.trim().split(/\s+/); // Handle multiple spaces
    return words
      .slice(0, 2) // Get first two words
      .map((word) => word.charAt(0).toUpperCase()) // Extract first letter
      .join(""); // Combine letters
  };

  return (
    <nav className="flex justify-between items-center px-6 md:px-12 py-4 bg-gray-900 shadow-md">
      <h2 className="text-2xl font-bold text-white">Smart Dashboard</h2>
      <div>
        {user ? (
          <div className="flex items-center gap-4">
            {/* 🔹 Display User Initials */}
            <span className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full font-medium text-lg">
              {getInitials(user?.name)}
            </span>

            {/* 🔹 Logout Button */}
            <Button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white text-base"
            >
              Logout
            </Button>
          </div>
        ) : (
          <>
            <Button
              variant="ghost"
              className="mr-4 text-white hover:text-blue-700 text-base"
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-base"
              onClick={() => router.push("/signup")}
            >
              Signup
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
