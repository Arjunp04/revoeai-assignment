"use client";

import ProtectedDashboardLayout from "@/components/ProtectedDashboard";
import { TableProvider } from "@/context/TableContext";

const Layout = ({ children }) => {
  return (
    <TableProvider>
      <ProtectedDashboardLayout>{children}</ProtectedDashboardLayout>
    </TableProvider>
  );
};

export default Layout;
