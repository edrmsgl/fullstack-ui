import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/dbConnection";

type AgeGroups = {
  name: string;
  minAge: number;
  maxAge: number;
  description: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db("fullstackui");
  const collection = db.collection("agegroups");

  if (req.method === "GET") {
    const agegroups = await collection.find({}).toArray();
    res.status(200).json(agegroups);
  } else if (req.method === "POST") {
    const { name, minAge, maxAge, description } = req.body;

    if (!name || !minAge || !maxAge || !description) {
      res.status(400).json({ message: "Tüm alanlar zorunludur" });
      return;
    }

    const newAgeGroups: AgeGroups = {
      name, minAge, maxAge, description
    };

    const result = await collection.insertOne(newAgeGroups);
    res.status(201).json(result);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}