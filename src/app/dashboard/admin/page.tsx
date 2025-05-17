'use client';
import React from 'react'
import UserCard from '@/components/usercard'
import ChartRadial from '@/components/chart-radial';
import ChartBar from '@/components/chart-bar';
import UserCalendar from '@/components/user-calendar';
import Agenda from '@/components/agenda';
import Messages from '@/components/massages';
import Finance from '@/components/finance';
import NoticeBoard from '@/components/notice-board';

const UserCardData = [
  { percent: 15, total: '124,648', type: 'Students' },
  { percent: 3, total: '12,379', type: 'Teacher' },
  { percent: 3, total: '29,300', type: 'Staffs' },
  { percent: 5, total: '95,800', type: 'Awards' },
];

const AdminPage = () => {
  return (
    <div className='flex flex-col md:flex-row mt-5 gap-5'>
      <div className='w-full lg:w-3/4'>
        <div className='flex flex-row justify-between gap-2.5 flex-wrap'>
          {UserCardData.map((user, index) => <UserCard key={index} percent={user.percent} total={user.total} type={user.type} />)}
        </div>

        <div className='w-full clear-both'>
          <div className='flex flex-col lg:flex-row justify-between gap-5 mt-5'>
          <div className='w-full lg:w-1/3'>
            <ChartRadial title='Students' />
          </div>
          <div className='w-full lg:w-2/3'>
            <ChartBar title='Attandance' />
          </div>
        </div>
        </div>
        <div className='w-full mt-5'>
          <Finance title='Finance' />
        </div>
        <div className='w-full mt-5 flex flex-row gap-5'>
          <div className='w-full lg:w-2/3'>
            <NoticeBoard title='Notice Board' />
          </div>
          <div className='w-full lg:w-1/3'>
            2
          </div>
        </div>

      </div>
      <div className='w-full lg:w-1/4'>
        <div className='calendar'>
          <UserCalendar title={'Calendar'} />
        </div>
        <div className='agenda mt-5'>
          <Agenda title='Agenda' />
        </div>
        <div className='messages mt-5'>
          <Messages title='Messages' />
        </div>
      </div>
    </div>
  )
}

export default AdminPage