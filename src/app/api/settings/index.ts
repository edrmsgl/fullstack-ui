import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/dbConnection";

type Settings = {
  title: string;
  category: string;
  path: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db("deneme");
  const collection = db.collection("settings");

  if (req.method === "GET") {
    const settings = await collection.find({}).toArray();
    res.status(200).json(settings);
  } else if (req.method === "POST") {
    const { title, category, path } = req.body;

    if (!title || !category || !path) {
      res.status(400).json({ message: "Tüm alanlar zorunludur" });
      return;
    }

    const newSettings: Settings = {
      title, category, path
    };

    const result = await collection.insertOne(newSettings);
    res.status(201).json(result);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}