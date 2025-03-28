"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useTable } from "@/context/TableContext";
import TableData from "@/components/table/TableData";

const TableDetails = () => {
  const { fetchGoogleSheetData, sheetData, loading, setLoading } = useTable();
  const { tableId } = useParams();
  const [table, setTable] = useState(null);
  const [filteredRows, setFilteredRows] = useState([]);

  useEffect(() => {
    const fetchTableDetails = async () => {
      try {
        const response = await axios.get(`/api/table/${tableId}`);
        setTable(response.data.data);
      } catch (error) {
        console.error("Error fetching table details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (tableId) fetchTableDetails();
  }, [tableId]);

  useEffect(() => {
    fetchGoogleSheetData();
  }, []);

useEffect(() => {
  if (table && sheetData?.rows?.length) {
    const formattedRows = sheetData.rows.map((row) => {
      let filteredRow = {};
      table.columns.forEach((col) => {
        filteredRow[col.name] = row.values[col.name.trim()] || "-"; // ✅ Corrected
      });
      return filteredRow;
    });
    setFilteredRows(formattedRows);
  }
}, [table, sheetData]);


  if (loading) {
    return <p className="text-center text-white mt-40">Loading...</p>;
  }

 return (
   <div className="p-6 max-w-[90%] mx-auto">
     <div className="relative flex items-center">
       {/* Back Button on the Left */}
       <Button
         className="mt-2 bg-gray-700 hover:bg-gray-600 absolute left-0"
         onClick={() => window.history.back()}
       >
         Back
       </Button>

       {/* Centered Table Name */}
       <h1 className="text-2xl font-bold mt-2 mx-auto">{table?.name}</h1>
         </div>
         
         <p className="mt-6">Fetching and displaying data from google sheets</p>

     {/* Pass table data to DataTable */}
     <TableData columns={table?.columns} rows={filteredRows} />
   </div>
 );

};

export default TableDetails;
