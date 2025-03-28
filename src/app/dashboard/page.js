"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTable } from "@/context/TableContext";
import CreateTableModal from "@/components/dashboard/CreateTableModal";
import GoogleSheetsTable from "@/components/dashboard/GoogleSheetsTable";

const Dashboard = () => {
  const { tableData, loading } = useTable();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6 md:max-w-[90%] mx-auto min-h-[90vh]">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>

        {/* Create Table Button */}
        <Button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-base"
        >
          + Create Table
        </Button>
      </div>

      {/* Render Modal */}
      <CreateTableModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Tables List */}
      <div className="mt-6">
        {loading ? (
          <p className="text-white flex items-center justify-center">
            Loading tables...
          </p>
        ) : !tableData ||
          !Array.isArray(tableData) ||
          tableData.length === 0 ? ( // ✅ Added Array.isArray() check
          <p className="text-white flex items-center justify-center mt-32">
            No tables available
          </p>
        ) : (
          <div className="mt-6">
           <GoogleSheetsTable/>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
