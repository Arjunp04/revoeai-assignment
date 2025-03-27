"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import InputField from "./InputField";
import { Info } from "lucide-react";
import { signUpSchema } from "@/utils/zodValidation";
import { useAuth } from "@/context/AuthContext";

const SignUpForm = () => {

  const [showTooltip, setShowTooltip] = useState(false);
  const { signup, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

   const onSubmit = async (data) => {
    await signup(data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-950 text-white">
      <div className="bg-gray-900 bg-opacity-90 p-10 rounded-2xl shadow-lg w-full max-w-md border border-gray-700">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <InputField
            label="Full Name"
            type="text"
            register={register("name")}
            error={errors.name}
            placeholder="John Doe"
          />
          <InputField
            label="Email Address"
            type="email"
            register={register("email")}
            error={errors.email}
            placeholder="example@gmail.com"
          />

          {/* Password Field with Tooltip */}
          <div className="relative">
            <InputField
              label="Password"
              type="password"
              register={register("password")}
              error={errors.password}
              placeholder="**********"
            />
            <div
              className="absolute left-18 top-1 text-gray-400 cursor-pointer"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <Info size={18} />
            </div>

            {/* Tooltip for Password Rules */}
            {showTooltip && (
              <div className="absolute right-10 -mt-10 bg-gray-800 text-white text-xs tracking-wide rounded-md p-2 shadow-lg w-64">
                Password must contain:
                <ul className="list-disc list-inside">
                  <li>At least 6 characters</li>
                  <li>One uppercase (A-Z)</li>
                  <li>One lowercase (a-z)</li>
                  <li>One number (0-9)</li>
                  <li>One special character (@, #, $, etc.)</li>
                </ul>
              </div>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-lg font-medium bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 transition-all"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>

        <p className="text-sm text-gray-300 text-center mt-4">
          Returning user?{" "}
          <Link
            href="/login"
            className="text-blue-300 hover:text-blue-400 transition hover:underline"
          >
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
