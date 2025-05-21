'use client';
import React from 'react'
import Title from './title';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Image from 'next/image';
import VisibilityIcon from '@mui/icons-material/Visibility';

function createData(
  img: string,
  desc: string,
  status: string,
  date: string,
  name: string,
  job: string,
  views: string,
) {
  return { img, desc, status, date, name, job, views };
}

const rows = [
  createData('https://randomuser.me/api/portraits/men/1.jpg', 'Math Olympiad', 'Competition', '04/02/2024', 'By My. Jackson', 'Math Teacher', '30'),
  createData('https://randomuser.me/api/portraits/men/2.jpg', 'Science Exploration', 'Fair', '05/15/2024', 'By Mrs. Smith', 'Science Teacher', '78'),
  createData('https://randomuser.me/api/portraits/women/1.jpg', 'Tech Training', 'Workshop', '06/10/2024', 'By Mr. Williams', 'Computer Science Teacher', '12'),
  createData('https://randomuser.me/api/portraits/men/3.jpg', 'Historical Knowledge', 'Quiz', '07/12/2024', 'By Dr. Brown', 'History Teacher', '14'),
  createData('https://randomuser.me/api/portraits/women/2.jpg', 'Creative Arts', 'Exhibition', '08/01/2024', 'By Ms. Turner', 'Art Teacher', '25'),
  createData('https://randomuser.me/api/portraits/men/4.jpg', 'Sports Competition', 'Competition', '09/20/2024', 'By Coach Lee', 'Physical Education Teacher', '5'),
  createData('https://randomuser.me/api/portraits/men/5.jpg', 'World Geography', 'Challenge', '10/05/2024', 'By Mr. White', 'Geography Teacher', '90'),
  createData('https://randomuser.me/api/portraits/men/6.jpg', 'Music Performance', 'Festival', '11/12/2024', 'By Mrs. Green', 'Music Teacher', '60'),
  createData('https://randomuser.me/api/portraits/women/3.jpg', 'Theatre Arts', 'Performance', '12/01/2024', 'By Mr. Black', 'Theatre Teacher', '36'),
  createData('https://randomuser.me/api/portraits/men/7.jpg', 'Tech Contest', 'Competition', '01/18/2025', 'By Mr. Davis', 'Computer Science Teacher', '2')
];

const NoticeBoard = ({ title }: { title: string }) => {
  return (
    <div className='bg-white rounded-2xl w-full p-4 h-full'>
      <Title title={title} icon={true} />
      <div className='w-full max-h-[470px] overflow-auto'>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    <div className='flex justify-start item-center gap-3'>
                      <Image src={row.img} alt='' width={100} height={100} unoptimized className='w-10 h-10 rounded-full overflow-hidden' />
                      <div className='flex flex-col gap-1'>
                        <div className='font-semibold notice-desc'>{row.desc}</div>
                        <div className='font-semibold notice-status'>{row.status}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex justify-center item-center bg-indigo-200 text-white rounded-full p-1'>
                      {row.date}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex flex-col gap-1'>
                      <div className='font-semibold notice-name'>{row.name}</div>
                      <div className='notice-job text-gray-400 text-xs'>( {row.job} )</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex justify-center item-center gap-2 leading-[24px] cursor-pointer'>
                      <VisibilityIcon className='text-indigo-300'/>
                      <div className='font-semibold'>{row.views}</div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}

export default NoticeBoard;