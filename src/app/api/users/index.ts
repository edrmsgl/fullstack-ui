import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

type User = {
  name: string;
  email: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db("deneme");
  const collection = db.collection("users");

  if (req.method === "GET") {
    const users = await collection.find({}).toArray();
    res.status(200).json(users);
  } else if (req.method === "POST") {
    const { name, email } = req.body;

    if (!name || !email) {
      res.status(400).json({ message: "Name and email are required" });
      return;
    }

    const newUser: User = {
      name,
      email,
    };

    const result = await collection.insertOne(newUser);
    res.status(201).json(result);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}