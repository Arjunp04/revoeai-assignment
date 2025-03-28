import Table from "@/models/Table";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { tableId } = await params;
    const table = await Table.findById(tableId);

    if (!table) {
      return NextResponse.json({ error: "Table not found" }, { status: 404 });
    }

    return NextResponse.json({ data: table }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
