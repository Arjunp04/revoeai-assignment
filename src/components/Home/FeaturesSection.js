import React from "react";
import { Card, CardContent } from "../ui/card";

// Reusable Feature Card Component
const FeatureCard = ({ title, description }) => {
  return (
    <Card className="bg-gray-800 rounded-2xl shadow-lg hover:scale-105 transition-transform">
      <CardContent className="p-6 text-center">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="text-gray-400 mt-2">{description}</p>
      </CardContent>
    </Card>
  );
};

const FeaturesSection = () => {
  return (
    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl px-5 mx-auto">
    
      <FeatureCard
        title="📊 Google Sheets Sync"
        description="Fetch and display real-time data from Google Sheets."
      />
      <FeatureCard
        title="➕ Dynamic Columns"
        description="Add new columns dynamically to enhance your data."
      />
    </div>
  );
};

export default FeaturesSection;
