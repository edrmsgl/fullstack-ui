'use client';
import React from 'react'
import { useState, useEffect } from "react";
import UserCard from '@/components/usercard'
import ChartRadial from '@/components/chart-radial';
import ChartBar from '@/components/chart-bar';
import UserCalendar from '@/components/user-calendar';
import Agenda from '@/components/agenda';
import Messages from '@/components/massages';
import Finance from '@/components/finance';
import NoticeBoard from '@/components/notice-board';
import Tasks from '@/components/tasks';

const Admin = () => {
  const [students, setStudents] = useState<Students[]>([]);
  const fetchStudents = async () => {
    const res = await fetch("/api/students");
    const data = await res.json();
    setStudents(data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);


  const UserCardData = [
    { icon: 'GroupIcon', total: students.length, type: 'Öğrenci' },
    { icon: 'SchoolIcon', total: '12,379', type: 'Eğitmen' },
    { icon: 'EmojiEventsIcon', total: '95,800', type: 'Ödül' },
  ];

  return (
    <div className='flex flex-col md:flex-row mt-5 gap-5'>
      <div className='w-full lg:w-3/4'>
        <div className='flex flex-row justify-between gap-2.5 flex-wrap'>
          {UserCardData.map((user, index) => (
            <UserCard
              key={index}
              icon={user.icon}
              total={user.total as string}
              type={user.type}
            />
          ))}
        </div>

        <div className='w-full clear-both'>
          <div className='flex flex-col lg:flex-row justify-between gap-5 mt-5'>
            <div className='w-full lg:w-1/3'>
              <ChartRadial title='Öğrenci' />
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
            <Tasks title='Tasks' />
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

export default Admin;