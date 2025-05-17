'use client';
import React from 'react'
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
} from "recharts";

import BoyOutlinedIcon from '@mui/icons-material/BoyOutlined';
import GirlOutlinedIcon from '@mui/icons-material/GirlOutlined';
import Title from './title';

const data = [
  {
    name: "Total",
    count: 100,
    fill: "#fff",
  },
  {
    name: "Boys",
    count: 25.50,
    fill: "#cfceff",
  },
  {
    name: "Girls",
    count: 58.73,
    fill: "#fae27c",
  }
];

const ChartRadial = ({ title }: { title: string }) => {
  return (
    <div className='bg-white rounded-2xl w-full p-4 h-full'>
      <Title title={title} />
      <div className='w-full relative h-[400px]'>
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={32}
            data={data}
          >
            <RadialBar
              label={{ position: "insideStart", fill: "#fff" }}
              background
              dataKey="count"
            />
          </RadialBarChart>
        </ResponsiveContainer>

        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <div className='flex items-center justify-center'>
            <BoyOutlinedIcon className='text-[75px]! text-indigo-200 -mr-5' />
            <GirlOutlinedIcon className='text-[75px]! text-yellow-200 -ml-5' />
          </div>
        </div>
      </div>
       <div className='mt-5 flex justify-center items-center gap-20'>
          <div className='boys'>
            <div className='bg-indigo-200 rounded-full w-5 h-5 mb-2.5' />
            <div className='font-bold mb-2.5 text-2xl'>45,414</div>
            <div className='text-gray-400 text-sm'>Boys (25.50)</div>
          </div>
          <div className='girls'>
            <div className='bg-yellow-200 rounded-full w-5 h-5 mb-2.5' />
            <div className='font-bold mb-2.5 text-2xl'>40,270</div>
            <div className='text-gray-400 text-sm'>Girls (58.73)</div>
          </div>
        </div>
    </div>
  )
}

export default ChartRadial