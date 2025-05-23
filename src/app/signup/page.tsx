'use client';
import { useState, useEffect } from "react";
import Image from 'next/image';

type User = {
  _id: string;
  name: string;
  email: string;
  password: number;
};

const SingUp = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleAddUser = async () => {
    if (!isValidEmail(email)) {
      alert("Geçerli bir e-posta adresi girin.");
      return;
    }

    if (!name || !email || !password) {
      alert("Kullanıcı Adı, E-posta ve Şifre zorunludur.");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    if (res.ok) {
      setName("");
      setEmail("");
      setPassword("");
      fetchUsers();
    } else {
      const error = await res.json();
      alert(error.message || "Kullanıcı eklenemedi.");
    }
    setLoading(false);
  };


  const handleDeleteUser = async (id: string) => {
    const confirmed = confirm("Bu kullanıcıyı silmek istediğinize emin misiniz?");
    if (!confirmed) return;

    try {
      const res = await fetch('/api/users/' + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        alert("Kullanıcı başarıyla silindi.");
        fetchUsers(); // Listeyi yenile
      } else {
        const error = await res.json();
        alert(error.message || "Kullanıcı silinirken hata oluştu.");
      }
    } catch (error) {
      alert("Beklenmeyen bir hata oluştu: " + String(error));
    }
  };

  return (
    <div className='relative w-screen h-screen'>
      <Image src="https://pagedone.io/asset/uploads/1702362010.png" alt="gradient background image" className="w-full h-full object-cover fixed" width={100} height={100} unoptimized />
      <div className="mx-auto max-w-lg px-6 lg:px-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 py-20">
        <div className="rounded-2xl bg-white shadow-xl">
          <div className="lg:p-11 p-7 mx-auto">
            <h1 className="text-gray-900 text-center font-manrope text-3xl font-bold leading-10 mb-11">Welcome to SignUp</h1>
            <input value={name} onChange={(e) => setName(e.target.value)} disabled={loading} className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4 mb-6" placeholder="Kullanıcı Adı" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4 mb-6" placeholder="E-Posta" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4 mb-1" placeholder="Şifre" />
            <button onClick={handleAddUser} disabled={loading} className="w-full h-12 text-white text-center text-base font-semibold leading-6 rounded-full hover:bg-indigo-200 transition-all duration-700 bg-indigo-600 shadow-sm mt-6 cursor-pointer">Kullanıcı Oluştur</button>
          </div>
        </div>

        {users && users.map((user) => (
          <li key={user._id} style={{ marginBottom: 10 }}>
            {user.name} ({user.email}){" "}
            <button onClick={() => handleDeleteUser(user._id)}>Sil</button>
          </li>
        ))}
      </div>
    </div>
  );
}

export default SingUp;