// pages/api/users.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Sadece POST istekleri destekleniyor' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('Users'); // "Users" veritabanı
    const collection = db.collection('users'); // "users" koleksiyonu

    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({ message: 'İsim ve şifre zorunludur' });
    }

    const result = await collection.insertOne({ name, password });

    return res.status(201).json({ message: 'Kullanıcı eklendi', id: result.insertedId });
  } catch (error) {
    console.error('API Hatası:', error); // 👈 Bu terminalde görülecek
    return res.status(500).json({ message: 'Sunucu hatası', error: String(error) });
  }
}
