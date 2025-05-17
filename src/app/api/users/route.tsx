import connectionToDB from "@/lib/mogoose";
import User from "@/models/user";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from 'bcrypt';

const saltRounds = 10;

export async function handler(req: NextRequest, res: NextResponse) {
    try {
        await connectionToDB();
        const {name, password} = await req.json();
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User({name, hashedPassword});
        await newUser.save();
        return NextResponse.json(newUser, {status: 200})

    } catch (error) {
        console.log(error)
    }
}