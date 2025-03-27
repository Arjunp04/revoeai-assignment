"use client";

import TableList from "@/components/dashboard/TableList";
import { useAuth } from "@/context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return <div className="p-10">welcome {user.name}</div>;
};

export default Dashboard;
