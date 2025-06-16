import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/dbConnection";

type Instructor = {
  fullName: string;
  picture: string;
  email: string;
  phone: string;
  ageGroup: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db("fullstackui");
  const collection = db.collection("instructors");

  if (req.method === "GET") {
    const users = await collection.find({}).toArray();
    res.status(200).json(users);
  } else if (req.method === "POST") {
    const { fullName, email, picture, phone, ageGroup } = req.body;

    if (!fullName || !email || !picture || !phone || !ageGroup ) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const newInstructor: Instructor = {
      fullName, email, picture, phone, ageGroup
    };

    const result = await collection.insertOne(newInstructor);
    res.status(201).json(result);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}