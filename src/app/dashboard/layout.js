"use client";

import ProtectedDashboardLayout from "@/components/ProtectedDashboard";

const Layout = ({ children }) => {
  return <ProtectedDashboardLayout>{children}</ProtectedDashboardLayout>;
};

export default Layout;
