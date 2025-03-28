"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTable } from "@/context/TableContext";

const CreateTableModal = ({ open, onClose }) => {
  const { createTable, loading, setLoading } = useTable();
  const [tableName, setTableName] = useState("");
  const [column, setColumn] = useState({ name: "", type: "Text" });

  // Handle column name change
  const handleColumnChange = (value) => {
    setColumn({ ...column, name: value });
  };

  // Handle column type change
  const handleTypeChange = (value) => {
    setColumn({ ...column, type: value });
  };

  // Submit Table Data
  const handleSubmit = async () => {
    if (!tableName.trim() || !column.name.trim()) {
      alert("Table name and column name are required!");
      return;
    }

    setLoading(true);
    await createTable({ name: tableName, columns: [column] });
    setLoading(false);
    onClose(); // Close modal after creation
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle>Create New Table</DialogTitle>
        </DialogHeader>

        {/* Table Name Input */}
        <Input
          type="text"
          placeholder="Table Name"
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
          className="text-white"
        />

        {/* Single Column Input */}
        <div className="flex gap-2 mt-2">
          <Input
            type="text"
            placeholder="Column Name"
            value={column.name}
            onChange={(e) => handleColumnChange(e.target.value)}
            className="text-white"
          />
          <select
            value={column.type}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="border p-1 rounded-md text-white text-sm tracking-wide"
          >
            <option value="Text" className="text-black font-medium">
              Text
            </option>
            <option value="Date" className="text-black font-medium">
              Date
            </option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <Button onClick={onClose} className="bg-red-600 hover:bg-red-700">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Table"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTableModal;
