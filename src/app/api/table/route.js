import Table from "@/models/Table";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

//create a table
export async function POST(req) {
  try {
    await connectDB();
    const { name, columns } = await req.json();
    console.log(name, columns);

    if (!name || !columns.length) {
      return NextResponse.json(
        { error: "Missing table name or columns" },
        { status: 400 }
      );
    }

    // Create a new table with columns
    const newTable = await Table.create({ name, columns, rows: [] });
    console.log(newTable);
    return NextResponse.json(
      { message: "Table Created!", table: newTable },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

//get all tables
export async function GET() {
  try {
    await connectDB();
    const tables = await Table.find();
    return NextResponse.json({ data: tables }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


