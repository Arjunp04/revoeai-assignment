"use client";
import { useTable } from "@/context/TableContext";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

const GoogleSheetsTable = () => {
  const { tableData, loading } = useTable();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  }

  if (!tableData || !tableData.columns || !tableData.rows) {
    return <p className="text-center text-gray-500">No data available.</p>;
  }

  return (
    <div className="w-full bg-white p-2 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-black mb-2">
        {tableData.name}
      </h2>
      <Table className="w-full border border-gray-300">
        {/* Table Headers */}
        <TableHeader>
          <TableRow className="bg-gray-200 hover:bg-gray-200">
            {tableData.columns.map((col, index) => (
              <TableHead
                key={index}
                className="text-left font-semibold px-4 py-2 border border-gray-300 "
              >
                {col.name}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {/* Table Body */}
        <TableBody>
          {tableData.rows.map((row, rowIndex) => (
            <TableRow key={rowIndex} className="border-b">
              {tableData.columns.map((col, colIndex) => (
                <TableCell
                  key={colIndex}
                  className="px-4 py-2 text-gray-700 border"
                >
                  {row.values[col.name] || "-"}{" "}
                  {/* Display row data dynamically */}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default GoogleSheetsTable;
