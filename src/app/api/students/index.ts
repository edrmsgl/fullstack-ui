import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/dbConnection";

type Students = {
  name: string;
  surname: string;
  email?: string;
  classroom?: string;
  dob?: string;
  phone?: string;
  address?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db("deneme");
  const collection = db.collection("students");

  if (req.method === "GET") {
    const users = await collection.find({}).toArray();
    res.status(200).json(users);
  } else if (req.method === "POST") {
    const { name, surname, email, classroom, dob, phone, address } = req.body;

    if (!name || !email || !surname || !classroom || !dob || !phone || !address) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const newStudents: Students = {
      name, surname, email, classroom, dob, phone, address
    };

    const result = await collection.insertOne(newStudents);
    res.status(201).json(result);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}