import React from 'react'
import Title from './title'
import { Divider } from '@mui/material';

const AgendaData = [
  {
    date: "08:00 am",
    type: "All Grade",
    desc: "Homeroom & Announcement"
  },
  {
    date: "10:00 am",
    type: "Grade 3-5",
    desc: "Math Review & Practice"
  },
  {
    date: "10:30 am",
    type: "Grade 6-8",
    desc: "Science Expriment & Discussion"
  },
  {
    date: "08:00 am",
    type: "All Grade",
    desc: "Homeroom & Announcement"
  },
  {
    date: "10:00 am",
    type: "Grade 3-5",
    desc: "Math Review & Practice"
  },
  {
    date: "10:30 am",
    type: "Grade 6-8",
    desc: "Science Expriment & Discussion"
  },
];

const agendaBgClass = (index: number) => {
  switch (index % 3) {
    case 0:
      return 'bg-indigo-200';
    case 1:
      return 'bg-yellow-200';
    case 2:
      return 'bg-pink-200';
    default:
      return '';
  }
};

const Agenda = ({ title }: { title: string }) => {
  return (
    <div className='bg-white rounded-2xl w-full p-4'>
      <Title title={title} />
      <div className='w-full'>
        {AgendaData.map((agendaItem, index) => (
          <div className='my-2' key={index}>
            <div className={'flex justify-center items-center rounded-md p-2.5 gap-2.5 '.concat(agendaBgClass(index))}>
            <div className='w-1/4 text-[14px]'>
              {agendaItem.date}
            </div>
            <Divider className='bg- w-0.5 h-[40px]' />
            <div className='w-3/4'>
              <div className='text-gray-700 text-[12px]'>{agendaItem.type}</div>
              <div className='font-bold text-[16px]'>{agendaItem.desc}</div>
            </div>
          </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Agenda