import React from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';

const UserCard = ({percent, total, type}:{ percent?: number, total?: string, type?: string}) => {
  return (
    <div className='odd:bg-indigo-200 even:bg-yellow-200 flex-1 rounded-2xl p-4 text-black min-w-[150px]'>
        <div className='flex justify-between items-center mb-6'>
            <div className={'bg-white rounded-full px-[9px] py-[3px] text-center text-xs flex justify-center items-center gap-0.5 '.concat(percent && percent < 5 ? 'text-red-600' : 'text-green-600')}>
                {percent && percent < 5 ? <ArrowDownwardOutlinedIcon className='text-[100%]!' /> : <ArrowUpwardOutlinedIcon className='text-[100%]!' />}{percent}%
            </div>
            <MoreHorizIcon className='cursor-pointer text-white text-sm' />
        </div>
        <div className='point font-bold text-2xl mb-3'>
            {total}
        </div>
        <div className='type'>
            {type}
        </div>
    </div>
  )
}

export default UserCard;