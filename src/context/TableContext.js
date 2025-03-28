"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const TableContext = createContext();

export const TableProvider = ({ children }) => {
  const [tableData, setTableData] = useState([]); // User-created tables
  const [sheetData, setSheetData] = useState([]); // Google Sheets data
  const [loading, setLoading] = useState(false);
  const [dynamicColumns, setDynamicColumns] = useState([]); // Dashboard-only columns

  // Fetch Google Sheets data
  const fetchGoogleSheetData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/google-sheet");
      console.log(response.data.sheetsData)
      setSheetData(response.data.sheetsData);
    } catch (error) {
      console.error("Error fetching Google Sheet data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoogleSheetData();
  }, []);

  // Fetch all user-created tables
  const fetchTables = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/table");
      console.log("tables fetched :",response)
      setTableData(response.data.data || []);
    } catch (error) {
      console.error("Error fetching tables:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  // Create a new table
  const createTable = async (newTable) => {
    try {
      const response = await axios.post("/api/table", newTable);
      fetchTables(); // Refresh table list
    } catch (error) {
      console.error("Error creating table:", error);
    }
  };

  // Add dynamic columns (Frontend only)
  const addDynamicColumn = (column) => {
    setDynamicColumns((prev) => [...prev, column]);
  };

  return (
    <TableContext.Provider
      value={{
        tableData,
        sheetData,
        dynamicColumns,
        loading,
        createTable,
        addDynamicColumn,
        setLoading,fetchGoogleSheetData
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export const useTable = () => useContext(TableContext);
