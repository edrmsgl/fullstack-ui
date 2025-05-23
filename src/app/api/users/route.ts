import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";
import bcrypt from "bcrypt";

// GET: Kullanıcıları listele
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("deneme"); // 👈 burada güncellendi
    const users = await db.collection("users").find({}).toArray();
    return NextResponse.json(users);
  } catch (error) {
    console.error("GET /api/users error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// POST: Yeni kullanıcı ekle
export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();
    const hashedPassword = await bcrypt.hash(password, 10)

    if (!name || !email || !password) {
      return NextResponse.json({ message: "Name and email are required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("deneme"); // 👈 burada da güncellendi
    const result = await db.collection("users").insertOne({ name, email, password: hashedPassword });

    return NextResponse.json({ message: "User added", userId: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error("POST /api/users error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
