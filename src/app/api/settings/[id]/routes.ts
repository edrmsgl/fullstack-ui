// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "../../../../lib/dbConnection";

export async function DELETE(_id: NextRequest, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db("fullstackui");
    const settings = db.collection("settings");

    const result = await settings.deleteOne({ _id: new ObjectId(params.id) });

    if (result.deletedCount === 1) {
      return NextResponse.json({ message: "Menu silindi" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Menu bulunamadı" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Sunucu hatası", error }, { status: 500 });
  }
}