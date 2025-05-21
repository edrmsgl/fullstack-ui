'use client';
import { useState, useEffect } from "react";
import Image from 'next/image';
import Link from 'next/link';

type User = {
  _id: string;
  name: string;
  email: string;
};

const SingUp = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

    const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  };

    useEffect(() => {
  fetchUsers();
}, []);


  const handleAddUser = async () => {
    if (!name || !email) {
      alert("Name and email are required");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    });
    if (res.ok) {
      setName("");
      setEmail("");
      fetchUsers();
    } else {
      const error = await res.json();
      alert(error.message || "Failed to add user");
    }
    setLoading(false);
  };


    const handleDeleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    const res = await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      fetchUsers();
    } else {
      const error = await res.json();
      alert(error.message || "Failed to delete user");
    }
  };

    return (
        <div className='relative w-screen h-screen'>
            <Image src="https://pagedone.io/asset/uploads/1702362010.png" alt="gradient background image" className="w-full h-full object-cover fixed" width={100} height={100} unoptimized />
            <div className="mx-auto max-w-lg px-6 lg:px-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 py-20">
                <div className="rounded-2xl bg-white shadow-xl">
                    <div className="lg:p-11 p-7 mx-auto">
                        <h1 className="text-gray-900 text-center font-manrope text-3xl font-bold leading-10 mb-11">Welcome to SignUp</h1>
                        <input value={name} onChange={(e) => setName(e.target.value)}disabled={loading} className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4 mb-6" placeholder="Username" />
                        <input value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4 mb-1" placeholder="Email" />
                        <button onClick={handleAddUser} disabled={loading} className="w-full h-12 text-white text-center text-base font-semibold leading-6 rounded-full hover:bg-indigo-200 transition-all duration-700 bg-indigo-600 shadow-sm mb-11 mt-6 cursor-pointer">Create User</button>
                        <Link href={'/signin'} className="flex justify-center text-gray-900 text-base font-medium leading-6"> Don’t have an account? <span className="text-indigo-600 font-semibold pl-3"> Sign In</span></Link>
                    </div>
                </div>


                {users.map((user) => (
          <li key={user._id} style={{ marginBottom: 10 }}>
            {user.name} ({user.email}){" "}
            <button onClick={() => handleDeleteUser(user._id)}>Sil</button>
          </li>
        ))}
            </div>
        </div>

        
    )
}

export default SingUp;