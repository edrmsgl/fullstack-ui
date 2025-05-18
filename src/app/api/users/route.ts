import connectionToDB from "@/lib/mongoose";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    console.log("📩 API /api/users endpoint called");

    await connectionToDB();
    console.log("Connected to Mongo");

    const { name, password } = await req.json();
    console.log("Received data:", name, password);

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🔐 Password hashed");

    const newUser = new User({ name, password: hashedPassword });
    await newUser.save();

    console.log("User saved to DB");
    return NextResponse.json({ message: "User created", user: newUser }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error in POST /api/users:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Internal Server Error" }, { status: 500 });
  }
}