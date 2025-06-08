import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnection";

//GET: Öğrencileri listele
export async function GET() {
  try {
    const client = await connectDB;
    const db = client.db("fullstackui"); // 👈 burada güncellendi
    const students = await db.collection("students").find({}).toArray();
    return NextResponse.json(students);
  } catch (error) {
    console.error("GET /api/students error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// POST: Yeni öğrenci ekle
export async function POST(request: Request) {
  try {
    const { name, surname, email, classroom, dob, phone, address } = await request.json();

    if (!name || !email || !surname || !picture || !classroom || !dob || !phone || !address) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const client = await connectDB;
    const db = client.db("fullstackui");
    const result = await db.collection("students").insertOne({ name, surname, picture, email, classroom, dob, phone, address });

    return NextResponse.json({ message: "Student added", userId: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error("POST /api/users error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}