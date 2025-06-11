import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import connectDB from "../../../lib/dbConnection";

// GET: Öğrencileri listele
export async function GET() {
  try {
    const client = await connectDB;
    const db = client.db("fullstackui");
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
    const { name, surname, email, picture, dob, phone, address, parentname, parentsurname, parentphone, parentemail } = await request.json();

    if (!name || !surname || !picture || !parentname || !parentsurname || !parentphone || !parentemail || !dob || !address) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const client = await connectDB;
    const db = client.db("fullstackui");
    const result = await db.collection("students").insertOne({ name, surname, picture, email, dob, phone, address, parentname, parentsurname, parentphone, parentemail });

    return NextResponse.json({ message: "Student added", userId: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error("POST /api/students error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// PUT: Öğrenci güncelle
export async function PUT(request: Request) {
  try {
    const { _id, name, surname, email, picture, dob, phone, address, parentname, parentsurname, parentphone, parentemail } = await request.json();

    if (!_id || !name || !surname || !picture || !parentname || !parentsurname || !parentphone || !parentemail || !dob || !address) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const client = await connectDB;
    const db = client.db("fullstackui");
    const result = await db.collection("students").updateOne(
      { _id: new ObjectId(_id) },
      { $set: { name, surname, picture, email, dob, phone, address, parentname, parentsurname, parentphone, parentemail } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ message: "Student not found or not updated" }, { status: 404 });
    }

    return NextResponse.json({ message: "Student updated" });
  } catch (error) {
    console.error("PUT /api/students error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE: Öğrenci sil
export async function DELETE(request: Request) {
  try {
    const { _id } = await request.json();

    if (!_id) {
      return NextResponse.json({ message: "Student ID is required" }, { status: 400 });
    }

    const client = await connectDB;
    const db = client.db("fullstackui");
    const result = await db.collection("students").deleteOne({ _id: new ObjectId(_id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Student not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Student deleted" });
  } catch (error) {
    console.error("DELETE /api/students error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}