'use client';
import React from 'react'
import TextsmsIcon from '@mui/icons-material/Textsms';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import { Input } from '@mui/material';
import Image from 'next/image';

const TopBar = () => {
  return (
    <div className='flex items-center justify-end lg:justify-between'>
      <div className='hidden search relative rounded-full border border-gray-300 px-3 py-1.5 gap-2.5 lg:flex justify-center items-center'>
        <SearchIcon className='text-gray-400' />
        <Input placeholder='Search' className='text-xs! min-w-60' />
      </div>
      <div className='userbar flex items-center justify-end gap-8'>
        <div className='flex justify-center items-center rounded-full bg-white w-10 h-10 cursor-pointer'><TextsmsIcon /></div>
        <div className='flex justify-center items-center rounded-full bg-white w-10 h-10 cursor-pointer relative'><NotificationsIcon />
          <div className='absolute -right-2 -top-2 bg-indigo-600 w-6 h-6 text-white flex justify-center items-center rounded-full border-2 border-white text-sm'>5</div>
        </div>
        <div className='userFullName text-right leading-5'>
          <h3 className='font-bold'>Dr. Samir Patel</h3>
          <span className='text-gray-400 text-xs'>Admin</span>
        </div>
        <div className='userPicture relative'>
          <Image src={'https://randomuser.me/api/portraits/men/4.jpg'} alt='' width={50} height={50} unoptimized className='rounded-full overflow-hidden' />
          <div className='absolute right-0 bottom-0 bg-green-600 w-3.5 h-3.5 rounded-full border-2 border-white' />
        </div>
      </div>
    </div>
  )
}

export default TopBar;