'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SignIn = () => {
  return (
    <div className='relative w-screen h-screen'>
      <Image src="https://pagedone.io/asset/uploads/1702362010.png" alt="gradient background image" className="w-full h-full object-cover fixed" width={100} height={100} unoptimized />
      <div className="mx-auto max-w-lg px-6 lg:px-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 py-20">
        <div className="rounded-2xl bg-white shadow-xl">
          <form className="lg:p-11 p-7 mx-auto">
            <h1 className="text-gray-900 text-center font-manrope text-3xl font-bold leading-10 mb-11">Welcome to Sign In</h1>
            <input type="name" className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4 mb-6" placeholder="Username" />
            <input type="password" className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4 mb-1" placeholder="Password" />
            {/* <a href="javascript:;" className="flex justify-end mb-6">
              <span className="text-indigo-600 text-right text-base font-normal leading-6">Forgot Password?</span>
            </a> */}
            <button className="w-full h-12 text-white text-center text-base font-semibold leading-6 rounded-full hover:bg-indigo-200 transition-all duration-700 bg-indigo-600 shadow-sm mb-11 mt-6 cursor-pointer">Login User</button>
            <Link href={'/signup'} className="flex justify-center text-gray-900 text-base font-semibold leading-6"> Don’t have an account? <span className="text-indigo-600 font-semibold pl-3"> Sign Up</span></Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignIn;