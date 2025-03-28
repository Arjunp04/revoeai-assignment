"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const TableContext = createContext();

export const TableProvider = ({ children }) => {
  const [tableData, setTableData] = useState([]);
  const [sheetData, setSheetData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch Google Sheet data
  const fetchGoogleSheetData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/google-sheet");
      console.log("Google Sheets Data fetched:", response.data.sheetsData);
      setSheetData(response.data.sheetsData);
    } catch (error) {
      console.error("Error fetching Google Sheet data:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoogleSheetData();
  }, []);

  // Fetch all tables from API
  const fetchTables = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/table");
      console.log("Tables fetched:", response.data.tables);
      setTableData(
        Array.isArray(response.data.tables) ? response.data.tables : []
      );
    } catch (error) {
      console.error("Error fetching tables:", error);
      setTableData([]);
    } finally {
      setLoading(false);
    }
  };

  // Create a new table (WITHOUT fetching Google Sheets data)
  const createTable = async (newTable) => {
    try {
      // Step 1: Create a new table
      const response = await axios.post("/api/table", newTable);
      const createdTable = response.data.table;
      console.log("New table created:", createdTable);

      // Step 2: Refresh the table list
      fetchTables();
    } catch (error) {
      console.error("Error creating table:", error);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  return (
    <TableContext.Provider
      value={{
        tableData,
        loading,
        setLoading,
        setSheetData,
        sheetData,
        createTable,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export const useTable = () => useContext(TableContext);
