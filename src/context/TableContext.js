"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const TableContext = createContext();

export const TableProvider = ({ children }) => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all tables from API
  const fetchTables = async () => {
    try {
      const response = await axios.get("/api/table");
      console.log("fetch tables list:", response);
      setTableData(
        Array.isArray(response.data.tables) ? response.data.tables : []
      ); // ✅ Ensure it's an array
    } catch (error) {
      console.error("Error fetching tables:", error);
      setTableData([]); // ✅ Handle error by setting an empty array
    } finally {
      setLoading(false);
    }
  };

  // Fetch Google Sheet data
  const fetchGoogleSheetData = async () => {
    try {
      const response = await axios.get("/api/google-sheet");
      console.log(response);
      setTableData(
        Array.isArray(response.data.sheetsData) ? response.data.sheetsData : []
      ); // ✅ Ensure it's an array
    } catch (error) {
      console.error("Error fetching Google Sheet data:", error);
      setTableData([]); // ✅ Handle error
    } finally {
      setLoading(false);
    }
  };

  // Create a new table
  const createTable = async (newTable) => {
    try {
      console.log(newTable);
      const response = await axios.post("/api/table", newTable);
      console.log("create table response:", response);
      setTableData((prevTables) => [...prevTables, response.data.table]);
    } catch (error) {
      console.error("Error creating table:", error);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  useEffect(() => {
    fetchGoogleSheetData();
  }, []);

  return (
    <TableContext.Provider value={{ tableData, loading, setLoading, createTable }}>
      {children}
    </TableContext.Provider>
  );
};

export const useTable = () => useContext(TableContext);
