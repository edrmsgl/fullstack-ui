'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import MarkUnreadChatAltOutlinedIcon from '@mui/icons-material/MarkUnreadChatAltOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const MenuItems = [
  {
    parentTitle: 'HOME',
    items: [
      { icon: <HomeIcon />, title: 'Dashboard', url: '/dashboard' },
      { icon: <SchoolIcon />, title: 'Teachers', url: '/teacher' },
      { icon: <GroupIcon />, title: 'Students', url: '/student' },
      { icon: <Diversity3Icon />, title: 'Attendance', url: '/attendance' },
      { icon: <MonetizationOnOutlinedIcon />, title: 'Finance', url: '/finance' },
      { icon: <AssignmentOutlinedIcon />, title: 'Notice', url: '/notice' },
      { icon: <CalendarMonthIcon />, title: 'Calendar', url: '/calendar' },
      { icon: <LocalLibraryOutlinedIcon />, title: 'Library', url: '/library' },
      { icon: <MarkUnreadChatAltOutlinedIcon />, title: 'Message', url: '/message' },
    ]
  },
  {
    parentTitle: 'OTHER',
    items: [
      { icon: <AccountBoxOutlinedIcon />, title: 'Profile', url: '/profile' },
      { icon: <SettingsOutlinedIcon />, title: 'Settings', url: '/settings' },
      { icon: <LogoutOutlinedIcon />, title: 'Log out', url: '/logout' },
    ]
  }
];

const Menu = () => {
  return (
    <>
    <div className='logo flex lg:justify-start justify-center items-center mt-5 gap-2 ml-[15px]'>
      <Image src="/icons/stack.png" width={40} height={40} alt='' />
      <span className='font-bold hidden lg:block'>FullStack-UI</span>
    </div>
    <div className='mt-10 text-sm'>
      {MenuItems.map(items => (
        <div className='flex flex-col my-4' key={items.parentTitle}>
          <span className='ml-[20px] text-gray-500 font-semibold mb-2.5 hidden lg:block'>{items.parentTitle}</span>
          {items.items.map(i => (
            <Link href={i.url} key={i.url} className=' mx-2.5 flex rounded-[10px] p-2 lg:justify-start justify-center items-center gap-4 hover:bg-indigo-200 hover:text-white text-gray-400 my-1'>
              <span className=''>{i.icon}</span>
              <span className='hidden lg:block font-light'>
                {i.title}
              </span>
            </Link>
          ))}
        </div>
      ))}
    </div>
    </>
  )
}

export default Menu;