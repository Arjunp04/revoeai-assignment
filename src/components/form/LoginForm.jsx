"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import InputField from "./InputField";
import { loginSchema } from "@/utils/zodValidation";
import { useAuth } from "@/context/AuthContext";

const LoginForm = () => {
  const { login, loading} = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    await login(data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-950">
      <div className="bg-gray-900 bg-opacity-90 p-10 rounded-2xl shadow-lg w-full max-w-md text-white border border-gray-700">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <InputField
            label="Email Address"
            type="email"
            register={register("email")}
            error={errors.email}
            placeholder="example@gmail.com"
          />
          <InputField
            label="Password"
            type="password"
            register={register("password")}
            error={errors.password}
            placeholder="**********"
          />

          <Button
            type="submit"
            className="w-full h-12 text-lg font-medium bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 transition-all"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <p className="text-sm text-gray-400 text-center mt-4">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-blue-400 hover:text-blue-500 transition"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
