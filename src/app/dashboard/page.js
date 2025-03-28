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

      {/* Google Sheets Data */}
      <div className="mt-5">
        <p className="mb-3">Fetchig and displating data from google sheets</p>
        <GoogleSheetsTable />
      </div>

      {/* Render Create Table Modal */}
      <CreateTableModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Created Tables Grid */}
      <div className="mt-10">
        <p className="text-2xl font-bold text-white">My Tables</p>
        {loading ? (
          <p className="text-white flex items-center justify-center mt-10">
            Loading tables...
          </p>
        ) : !tableData ||
          !Array.isArray(tableData) ||
          tableData.length === 0 ? (
          <p className="text-white flex items-center justify-center mt-20">
            No tables available
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tableData.map((table) => (
              <div
                key={table._id}
                className="p-4 bg-gray-800 rounded-lg shadow-md cursor-pointer hover:bg-gray-700 transition-all"
                // Navigation not implemented yet
              >
                <h3 className="text-lg font-semibold text-white">
                  {table.name}
                </h3>
                <p className="text-gray-400 text-sm">
                  Columns: {table.columns?.length || 0}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
