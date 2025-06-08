import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/dbConnection";

type Settings = {
  title: string;
  icon: string; // Optional for POST requests
  category: string;
  path: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db("fullstackui");
  const collection = db.collection("settings");

  if (req.method === "GET") {
    const settings = await collection.find({}).toArray();
    res.status(200).json(settings);
  } else if (req.method === "POST") {
    const { title, icon, category, path } = req.body;

    if (!title || !icon || !category || !path) {
      res.status(400).json({ message: "Tüm alanlar zorunludur" });
      return;
    }

    const newSettings: Settings = {
      title, icon, category, path
    };

    const result = await collection.insertOne(newSettings);
    res.status(201).json(result);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}