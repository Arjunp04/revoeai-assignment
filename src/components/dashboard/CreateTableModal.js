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
  const { createTable } = useTable();
  const [tableName, setTableName] = useState("");
  const [columns, setColumns] = useState([{ name: "", type: "Text" }]);

  // Add new column input field
  const addColumn = () => {
    setColumns([...columns, { name: "", type: "Text" }]);
  };

  // Handle column name/type change
  const handleColumnChange = (index, key, value) => {
    const updatedColumns = [...columns];
    updatedColumns[index][key] = value;
    setColumns(updatedColumns);
  };

  // Submit table data
  const handleSubmit = async () => {
    if (!tableName.trim() || columns.some((col) => !col.name.trim())) {
      alert("Table name and column names are required!");
      return;
    }

    await createTable({ name: tableName, columns });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">Create New Table</DialogTitle>
        </DialogHeader>

        {/* Table Name Input */}
        <Input
          type="text"
          placeholder="Table Name"
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
          className="bg-gray-800 text-white border-gray-600"
        />

        {/* Columns Inputs */}
        {columns.map((col, index) => (
          <div key={index} className="flex gap-2 mt-2">
            <Input
              type="text"
              placeholder="Column Name"
              value={col.name}
              onChange={(e) =>
                handleColumnChange(index, "name", e.target.value)
              }
              className="bg-gray-800 text-white border-gray-600"
            />
            <select
              value={col.type}
              onChange={(e) =>
                handleColumnChange(index, "type", e.target.value)
              }
              className="bg-gray-800 text-white border-gray-600 rounded-md p-1"
            >
              <option value="Text" className="text-black">
                Text
              </option>
              <option value="Date" className="text-black">
                Date
              </option>
            </select>
          </div>
        ))}

        {/* Add Column Button */}
        <Button
          onClick={addColumn}
          className="bg-gray-700 hover:bg-gray-600 text-white mt-3"
        >
          + Add Column
        </Button>

        {/* Action Buttons */}
        <div className="flex justify-between mt-4">
          <Button onClick={onClose} className="bg-red-600 hover:bg-red-700">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700"
          >
            Create Table
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTableModal;
