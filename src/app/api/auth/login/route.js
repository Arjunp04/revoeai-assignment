import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectDB } from "@/utils/db";
import { generateToken } from "@/utils/auth";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return (
        NextResponse.json({ error: "All fields are required" }), { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentails" },
        { status: 401 }
      );
    }

    const token = generateToken(user);

    return NextResponse.json({
      status: 200,
      message: "Login successfull",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    return NextResponse.json(
      {status: 500, error: "Something went wrong" },
    );
  }
}
