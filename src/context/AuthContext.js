"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores user data
  const [token, setToken] = useState(null); // Stores JWT token
  const [loading, setLoading] = useState(false); // Loading state for authentication
  const router = useRouter();

  // 🔹 Check user session on page load
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    // 🛑 If token or user data is missing, consider session expired
    if (!storedToken || !storedUser) {
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);

      if (isTokenExpired(storedToken)) {
        toast.error("Session expired! Please login again.");
        logout();
      } else {
        setUser(parsedUser);
        setToken(storedToken);
      }
    } catch (error) {
      // 🛑 If stored user data is corrupted, logout
      console.error("Error parsing user data:", error);
      logout();
    }
    setLoading(false);
  }, []);

  // 🔹 Function to check if token is expired
  const isTokenExpired = (token) => {
    try {
      const decoded = JSON.parse(atob(token.split(".")[1])); // Decode JWT
      return decoded.exp * 1000 < Date.now();
    } catch (error) {
      return true;
    }
  };

  // 🔹 Login function
  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/auth/login", credentials);
      console.log(response);
      if (response.status === 200) {
        const { user, token, message } = response.data;

        // Store user & token in localStorage
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);

        setUser(user);
        setToken(token);
        toast.success(message);
        router.push("/dashboard");
      } else if (response.data) {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Signup function
  const signup = async (userData) => {
    setLoading(true);
    try {
      console.log(userData);
      const response = await axios.post("/api/auth/signup", userData);
      console.log(response);
      if (response.status === 201) {
        toast.success("Account created successfully! Please log in.");
        router.push("/login");
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      toast.error(response?.data?.error || "Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Logout function
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    toast.success("Logged out successfully!");
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, signup, logout, loading, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 🔹 Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
