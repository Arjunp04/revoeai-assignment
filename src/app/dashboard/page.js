"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTable } from "@/context/TableContext";
import CreateTableModal from "@/components/dashboard/CreateTableModal";
import Link from "next/link";

const Dashboard = () => {
  const { tableData, loading } = useTable();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6 max-w-[90%] mx-auto">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-base"
          onClick={() => setIsModalOpen(true)}
        >
          + Create Table
        </Button>
      </div>

      {/* Table Creation Modal */}
      <CreateTableModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Render User Tables */}
      <h2 className="mt-6 text-xl font-semibold">My Tables</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
        {loading ? (
          <p className="flex justify-center mt-28">Loading...</p>
        ) : (
          tableData.map((table) => (
            <Link key={table._id} href={`/table/${table._id}`}>
              <div className="p-4 bg-gray-800 rounded cursor-pointer hover:bg-gray-700 transition">
                <h3 className="text-lg font-bold">{table.name}</h3>
                <p>Columns: {table.columns.length}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
