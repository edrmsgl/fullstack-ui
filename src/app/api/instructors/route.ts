import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import connectDB from "../../../lib/dbConnection";

// GET: Eğitmen listele
export async function GET() {
  try {
    const client = await connectDB;
    const db = client.db("fullstackui");
    const instructors = await db.collection("instructors").find({}).toArray();
    return NextResponse.json(instructors);
  } catch (error) {
    console.error("GET /api/instructors error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// POST: Yeni Eğitmen ekle
export async function POST(request: Request) {
  try {
    const { fullName, email, picture, phone, ageGroup } = await request.json();

    if (!fullName || !picture || !phone || !email || !ageGroup) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const client = await connectDB;
    const db = client.db("fullstackui");
    const result = await db.collection("instructors").insertOne({ fullName, email, picture, phone, ageGroup });

    return NextResponse.json({ message: "instructors added", userId: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error("POST /api/instructors error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// PUT: Eğitmen güncelle
export async function PUT(request: Request) {
  try {
    const { _id, fullName, email, picture, phone, ageGroup } = await request.json();

    if (!_id || !fullName || !picture || !phone || !email || !ageGroup) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const client = await connectDB;
    const db = client.db("fullstackui");
    const result = await db.collection("instructors").updateOne(
      { _id: new ObjectId(_id) },
      { $set: { fullName, picture, email, phone, ageGroup } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ message: "Instructor not found or not updated" }, { status: 404 });
    }

    return NextResponse.json({ message: "Instructor updated" });
  } catch (error) {
    console.error("PUT /api/instructors error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE: Eğitmen sil
export async function DELETE(request: Request) {
  try {
    const { _id } = await request.json();

    if (!_id) {
      return NextResponse.json({ message: "Instructor ID is required" }, { status: 400 });
    }

    const client = await connectDB;
    const db = client.db("fullstackui");
    const result = await db.collection("instructors").deleteOne({ _id: new ObjectId(_id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Instructor not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Instructor deleted" });
  } catch (error) {
    console.error("DELETE /api/Instructor error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}