import React from 'react';
import Title from './title';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Monday',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Tuesday',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Wednesday',
    uv: -1000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Thursday',
    uv: 500,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Friday',
    uv: -2000,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Saturday',
    uv: -250,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Sunday',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const gradientOffset = () => {
  const dataMax = Math.max(...data.map((i) => i.uv));
  const dataMin = Math.min(...data.map((i) => i.uv));

  if (dataMax <= 0) {
    return 0;
  }
  if (dataMin >= 0) {
    return 1;
  }

  return dataMax / (dataMax - dataMin);
};

const off = gradientOffset();

const Finance = ({ title } :{ title: string }) => {
  return (
    <div className='bg-white rounded-2xl w-full p-4 h-full mt-5'>
      <Title title={title} />
      <div className='w-full relative h-140'>
        <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke='#ddd' />
          <XAxis dataKey="name" axisLine={false} tick={{fill:"#d1d1d1"}} tickLine={false} />
          <YAxis axisLine={false} tick={{fill:"#d1d1d1"}} tickLine={false} />
          <Tooltip contentStyle={{borderRadius:"10px", borderColor:"lightGray"}}/>
          <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset={off} stopColor="#c6d2ff" stopOpacity={1} />
              <stop offset={off} stopColor="#fff085" stopOpacity={1} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="uv" stroke="#d1d1d1" fill="url(#splitColor)" />
        </AreaChart>
      </ResponsiveContainer>
      </div>
    </div>
  )
}

export default Finance