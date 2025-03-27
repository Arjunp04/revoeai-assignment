"use client";

import FeaturesSection from "@/components/Home/FeaturesSection";
import HeroSection from "@/components/Home/HeroSection";

export default function HomePage() {
  return (
    <div className="min-h-[90vh] bg-gray-950 text-white">
      <HeroSection />
      <FeaturesSection />
    </div>
  );
}
