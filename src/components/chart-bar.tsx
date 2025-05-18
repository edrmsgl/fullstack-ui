'use client';
import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Title from './title';

const data = [
  {
    name: 'Monday',
    present: 40,
    absend: 30
  },
  {
    name: 'Tuesday',
    present: 70,
    absend: 60
  },
  {
    name: 'Wednesday',
    present: 100,
    absend: 90
  },
  {
    name: 'Thirsday',
    present: 70,
    absend: 60
  },
  {
    name: 'Friday',
    present: 40,
    absend: 30
  }
];

const ChartBar = ({ title }: { title: string }) => {
  return (
    <div className='bg-white rounded-2xl w-full p-4 h-full'>
      <Title title={title} />
      <div className='w-full relative h-140'>
        <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          barSize={"20"}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke='#ddd' />
          <XAxis dataKey="name" axisLine={false} tick={{fill:"#d1d1d1"}} tickLine={false} />
          <YAxis axisLine={false} tick={{fill:"#d1d1d1"}} tickLine={false} />
          <Tooltip contentStyle={{borderRadius:"10px", borderColor:"lightGray"}}/>
          <Legend align='left' verticalAlign={"top"} wrapperStyle={{paddingTop: "20px", paddingBottom: "40px"}} />
          <Bar dataKey="present" fill="#c6d2ff" legendType="circle" radius={[10,10,0,0]} />
          <Bar dataKey="absend" fill="#fff085"  legendType="circle" radius={[10,10,0,0]} />
        </BarChart>
      </ResponsiveContainer>
      </div>
    </div>
  )
}

export default ChartBar;