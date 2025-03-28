import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 🔹 Parse service account credentials
    const credentials = JSON.parse(
      process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS
    );

    // 🔹 Authenticate using Service Account
    const auth = new google.auth.GoogleAuth({
      credentials, // Pass parsed JSON
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    // 🔹 Initialize Google Sheets API
    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    // 🔹 Fetch data from Google Sheets
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Sheet1!A:Z",
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: "No data found" }, { status: 404 });
    }

    // 🔹 Convert rows into structured format
    const formattedData = {
      name: "Google Sheet Data",
      columns: rows[0].map((header) => ({ name: header, type: "Text" })),
      rows: rows.slice(1).map((row) => ({
        values: Object.fromEntries(
          rows[0].map((header, i) => [header, row[i] || ""])
        ),
      })),
    };

    return NextResponse.json({ sheetsData: formattedData }, { status: 200 });
  } catch (error) {
    console.error("Error fetching data from Google Sheets:", error);
    return NextResponse.json(
      { message: "Error fetching data from Google Sheets" },
      { status: 500 }
    );
  }
}
