import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center text-center p-6 pt-14">
      <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500">
        Smart Dashboard
      </h1>
      <p className="text-lg text-gray-300 mt-4">
        Easily manage your data with real-time Google Sheets integration and
        dynamic tables.<br/> Organize and visualize your information efficiently!
      </p>

      {/* Get Started Button */}
      <Button
        onClick={handleGetStarted}
        className="mt-6 w-36 h-11 text-lg bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 cursor-pointer"
      >
        Get Started
      </Button>
    </div>
  );
};

export default HeroSection;
