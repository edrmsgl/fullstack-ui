// app/api/login/route.ts

import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/dbConnection";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ message: "Eksik veri" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("deneme");
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "Kullanıcı bulunamadı" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Şifre yanlış" }, { status: 401 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json({ message: "Sunucu hatası" }, { status: 500 });
  }
}