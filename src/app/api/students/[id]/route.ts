// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "../../../../lib/dbConnection";

export async function DELETE(_id: NextRequest, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db("fullstackui");
    const students = db.collection("students");

    const result = await students.deleteOne({ _id: new ObjectId(params.id) });

    if (result.deletedCount === 1) {
      return NextResponse.json({ message: "Öğrenci silindi" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Öğrenci bulunamadı" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Sunucu hatası", error }, { status: 500 });
  }
}