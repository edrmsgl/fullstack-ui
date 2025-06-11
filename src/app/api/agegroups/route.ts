import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import connectDB from "../../../lib/dbConnection";

// GET: Yaş Grubu listele
export async function GET() {
  try {
    const client = await connectDB;
    const db = client.db("fullstackui");
    const agegroups = await db.collection("agegroups").find({}).toArray();
    return NextResponse.json(agegroups);
  } catch (error) {
    console.error("GET /api/agegroups error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// POST: Yeni Yaş Grubu ekle
export async function POST(request: Request) {
  try {
    const { name, minAge, maxAge, description } = await request.json();

    if (!name || !minAge || !maxAge || !description) {
      return NextResponse.json({ message: "Tüm alanlar zorunludur" }, { status: 400 });
    }

    const client = await connectDB;
    const db = client.db("fullstackui");
    const result = await db.collection("agegroups").insertOne({ name, minAge, maxAge, description });

    return NextResponse.json({ message: "Yaş Grubu eklendi", agegroupId: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error("POST /api/agegroups error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// // PUT: YaÖğrenci güncelle
// export async function PUT(request: Request) {
//   try {
//     const { _id, name, surname, email, picture, dob, phone, address, parentname, parentsurname, parentphone, parentemail } = await request.json();

//     if (!_id || !name || !surname || !picture || !parentname || !parentsurname || !parentphone || !parentemail || !dob || !address) {
//       return NextResponse.json({ message: "All fields are required" }, { status: 400 });
//     }

//     const client = await connectDB;
//     const db = client.db("fullstackui");
//     const result = await db.collection("students").updateOne(
//       { _id: new ObjectId(_id) },
//       { $set: { name, surname, picture, email, dob, phone, address, parentname, parentsurname, parentphone, parentemail } }
//     );

//     if (result.modifiedCount === 0) {
//       return NextResponse.json({ message: "Student not found or not updated" }, { status: 404 });
//     }

//     return NextResponse.json({ message: "Student updated" });
//   } catch (error) {
//     console.error("PUT /api/students error:", error);
//     return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
//   }
// }

// DELETE: Yaç Grubu sil
export async function DELETE(request: Request) {
  try {
    const { _id } = await request.json();

    if (!_id) {
      return NextResponse.json({ message: "Yaş grubu ID'si zorunludur" }, { status: 400 });
    }

    const client = await connectDB;
    const db = client.db("fullstackui");
    const result = await db.collection("agegroups").deleteOne({ _id: new ObjectId(_id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Yaş grubu bulunamadı" }, { status: 404 });
    }

    return NextResponse.json({ message: "Yaş grubu silindi" });
  } catch (error) {
    console.error("DELETE /api/agegroups error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}