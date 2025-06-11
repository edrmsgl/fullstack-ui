import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/dbConnection";

type Students = {
  name: string;
  surname: string;
  picture: string;
  email?: string;
  dob?: string;
  phone?: string;
  address?: string;
  parentname: string;
  parentsurname: string;
  parentphone:string;
  parentemail: string
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db("fullstackui");
  const collection = db.collection("students");

  if (req.method === "GET") {
    const users = await collection.find({}).toArray();
    res.status(200).json(users);
  } else if (req.method === "POST") {
    const { name, surname, email, picture, dob, phone, address, parentname, parentsurname, parentphone, parentemail } = req.body;

    if (!name || !surname || !picture || !parentname || !parentsurname || !parentphone || !parentemail || !dob || !address) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const newStudents: Students = {
      name, surname, email, picture, dob, phone, address, parentname, parentsurname, parentphone, parentemail
    };

    const result = await collection.insertOne(newStudents);
    res.status(201).json(result);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}