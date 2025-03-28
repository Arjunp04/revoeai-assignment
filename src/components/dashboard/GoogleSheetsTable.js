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
  const { sheetData, loading } = useTable();

  if (!sheetData || !sheetData.columns || !sheetData.rows && loading) {
    return <p className="text-center text-white mt-10">Loading ...</p>;
  }

  return (
    <div className="w-full bg-white p-2 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-black mb-2">
        {sheetData.name}
      </h2>
      <Table className="w-full border border-gray-300">
        {/* Table Headers */}
        <TableHeader>
          <TableRow className="bg-gray-200 hover:bg-gray-200">
            {sheetData.columns.map((col, index) => (
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
          {sheetData.rows.map((row, rowIndex) => (
            <TableRow key={rowIndex} className="border-b">
              {sheetData.columns.map((col, colIndex) => (
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
