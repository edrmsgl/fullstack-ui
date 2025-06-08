import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnection";

//GET: Sayfa listele
export async function GET() {
  try {
    const client = await connectDB;
    const db = client.db("fullstackui");
    const settings = await db.collection("settings").find({}).toArray();
    return NextResponse.json(settings);
  } catch (error) {
    console.error("GET /api/settings error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// POST: Yeni Sayfa ekle
export async function POST(request: Request) {
  try {
    const { title, icon , category, path } = await request.json();

    if (!title || !icon || !category || !path ) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const client = await connectDB;
    const db = client.db("fullstackui");
    const result = await db.collection("settings").insertOne({ title, icon, category, path });

    return NextResponse.json({ message: "Sayfa eklenmiştir.", userId: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error("POST /api/settings error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}